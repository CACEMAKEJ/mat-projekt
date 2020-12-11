import firebase from '../firebaseSetup';
import UserProvider, { UserContext } from '../components/UserContext';
import Layout from '../components/Layout.js';
import Header from '../components/Header.js';
import UserCard from '../components/UserCard.js';
import { Button } from 'semantic-ui-react';
import Link from 'next/link';

const Profile = (user) => {
  return (
    <div className='profile'>
      <Header />
      <div></div>
      <div className='user'>
        <div className='profile-usercard'>
          <UserCard />
        </div>
        <div className='profile-licences'>
          <h2>Vámi vlastněné licence</h2>
          <UserCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
