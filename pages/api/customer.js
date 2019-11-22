import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.post((req, res) => {
  if (!req.user) return res.status(401).send('You need to be logged in.');
  const { email, name, phone } = req.body;
  if (!isEmail(email)) {
    return res.status(400).send({
      status: 'error',
      message: 'The email you entered is invalid.',
    });
  }
  return req.db
    .collection('customers')
    .countDocuments({ email })
    .then((count) => {
      if (count) {
        return Promise.reject(
          res.status(200).send({
            status: 'error',
            message: 'The customer with email has already been used',
          })
        );
      }
    })
    .then(() => req.db.collection('customers').insertOne({
      email,
      phone,
      name
    }))
    .then((user) => {
      req.session.userId = user.insertedId;
      res.status(201).send({
        status: 'ok',
        message: 'Customer added successfully',
      });
    })
    .catch(error => res.send({
      status: 'error',
      message: error.toString(),
    }));
});


handler.get((req, res) => {
  if (!req.user) return res.status(401).send('You need to be logged in.');
  return req.db
    .collection('customers')
    .find({})
    .toArray()
    .then((data) => res.json(data))
    .catch(error => {
      return Promise.reject(
        res.status(200).send({
          status: 'error',
          message: error.error,
        })
      )
    });
});

export default handler;
