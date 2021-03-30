import React, { useContext } from 'react';
// import { UserContext } from '../components/UserContext';
// import Layout from '../components/layout';

const IndexPage = () => {
  // const { state: { isLoggedIn, user: { name } } } = useContext(UserContext);
  return (
    // <Layout>
      
      
    // </Layout>
    <div className='p'>
      <style jsx>
        {`
          p {
            color: #888;
            font-size: 1.8rem;
            line-height: 2;
          }
          .code {
            color: red;
            background: lightblue;
            border-radius: 5px
            
          }
          .p {
            text-align: center;
          }
        `}
      </style>
      <h1>
        Hello,
          {/* {' '}
          {(isLoggedIn ? name : 'stranger')}
          ! */}
      </h1>
      <p>Have a wonderful day.</p>
      <div className="p">
        <p>
          To start using this starter kit, please uncomment every commented line <code className="code">in _app.jsx</code> and <code className="code">index.jsx</code>. 
          <br />
          Then the screen show you an error <code className="code">code: 500 in /api/session</code>.
          <br />
          Don't panic, please just configure the connection with your database in <code className="code">.env</code> file and you can connect with your choice of database.
        </p>
      </div>
    </div>
  );
};

export default IndexPage;
