import firebase from 'firebase/app';
import 'firebase/auth';
import UserProvider, { UserContext } from '../components/UserContext';
import Layout from '../components/Layout.js';
import Header from '../components/Header.js';
import UserCard from '../components/UserCard.js';

const Profile = (user) => {
  return (
    <Layout>
      <div className='profile-container'>
        <div className='profile-usercard'>
          <UserCard />
        </div>
        <div className='profile-licences'>
          <UserCard />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
