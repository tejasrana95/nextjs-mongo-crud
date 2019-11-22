import React, { useState, useContext } from 'react';
import axioswal from 'axioswal';
import { UserContext } from '../components/UserContext';
import Layout from '../components/layout';
import redirectTo from '../lib/redirectTo';

const SignupPage = () => {
  const { dispatch } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axioswal
      .post('/api/users', {
        name,
        email,
        password,
        gender
      })
      .then((data) => {
        if (data.status === 'ok') {
          dispatch({ type: 'fetch' });
          redirectTo('/');
        }
      });
  };

  return (
    <Layout>
      <div>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="1"
                onChange={e => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="2"
                onChange={e => setGender(e.target.value)}
              />
              Female
            </label>
          </div>
          <button type="submit">
            Sign up
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignupPage;
