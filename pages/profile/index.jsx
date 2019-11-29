import React, { useContext } from 'react';
import Link from 'next/link';
import Layout from '../../components/layout';
import { withAuthSync, getUserData } from '../../utils/auth';


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      getUser: {}
    };
  }

  componentDidMount() {
    this.setState({ getUser: getUserData() });
  }

  render() {
    return (
      <Layout>
        <style jsx>
          {`
          img {
            max-width: 100vh;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.05) 0 10px 20px 1px;
          }
        `}
        </style>
        <h1>Profile</h1>
        <div>
          <img src={this.state.getUser.profilePicture} width="256" height="256" alt={this.state.getUser.name} />
          <p>
            Name:
          {' '}
            {this.state.getUser.name}
          </p>
          <p>
            Bio:
          {' '}
            {this.state.getUser.bio}
          </p>
          <p>
            Email:
          {' '}
            {this.state.getUser.email}
          </p>
          <p>
            Gender:
          {' '}
            {this.state.getUser.gender}
          </p>
        </div>
        <Link href="/profile/settings"><button type="button">Edit</button></Link>
      </Layout>
    );
  }
}

export default withAuthSync(ProfilePage);