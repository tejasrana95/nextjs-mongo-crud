import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import mongodb from 'mongodb';
import isEmail from 'validator/lib/isEmail';
const handler = nextConnect();

handler.use(middleware);


const deleteCustomer = async (req) => {
    const { query: { id } } = req;
    const query = { _id: new mongodb.ObjectID(id) };
    return await req.db.collection('customers')
        .deleteOne(query).then(() => {
            return { status: 'success' };
        }).catch(error => {
            return Promise.reject({ status: error.toString() });
        });
}

const getByID = async (req) => {
    const { query: { id } } = req;
    const query = { _id: new mongodb.ObjectID(id) };

    return await req.db
        .collection('customers')
        .findOne(query)
        .then((data) => {
            return data
        })
        .catch(error => {
            return Promise.reject(
                {
                    status: 'error',
                    message: error.error,
                }
            )
        });
}

const checkEmailExists = async (req, email) => {

    return await req.db
        .collection('customers')
        .countDocuments({ email })
        .then((count) => {
            return count
        })
        .catch(error => {
            return Promise.reject(
                {
                    status: 'error',
                    message: error.error,
                }
            )
        });
}

const updateUser = async (req) => {
    const { _id, email, name, phone } = req.body;
    return await req.db
        .collection('customers')
        .updateOne(
            { _id: new mongodb.ObjectID(_id) },
            { $set: { name, email, phone } }
        ).then(response => {
            return { status: 'ok' }
        }).catch(error => {
            return {
                status: 'error',
                message: error.toString(),
            }
        });

}

handler.delete((req, res) => {
    if (!req.user) return res.status(401).send('You need to be logged in.');
    return deleteCustomer(req).then(data => {
        return res.status(204).send({});
    }).catch(error => {
        return Promise.reject(
            res.status(200).send({
                status: error.toString()
            })
        )
    });
});

handler.put((req, res) => {
    if (!req.user) return res.status(401).send('You need to be logged in.');
    const { email } = req.body;
    if (!isEmail(email)) {
        return res.status(400).send({
            status: 'error',
            message: 'The email you entered is invalid.',
        });
    }

    return getByID(req).then(data => {

        if (data && data.email === email) {
            return updateUser(req).then(data => {
                return res.status(201).send({
                    status: 'ok',
                    message: 'Customer update successfully',
                })
            }).catch(error => {
                return res.status(200).send(error);
            });
        } else {
            return checkEmailExists(req, email).then(count => {
                if (count > 0) {
                    return res.status(400).send({
                        status: 'error',
                        message: "Email already exists",
                    });
                } else {
                    return updateUser(req).then(data => {
                        res.status(201).send({
                            status: 'ok',
                            message: 'Customer update successfully',
                        })
                    }).catch(error => {
                        res.status(200).send(error);
                    });
                }
            }).catch(error => {
                res.status(200).send(error);
            });
        }
    })

});

handler.get((req, res) => {
    if (!req.user) return res.status(401).send('You need to be logged in.');
    return getByID(req).then(data => {
        return res.json(data);
    }).catch(error => {
        return Promise.reject(
            res.status(200).send({
                status: error.toString()
            })
        )
    });
});


export default handler;
