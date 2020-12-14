import firebase from '../firebaseSetup';
import UserProvider, { UserContext } from '../components/UserContext';
import Layout from '../components/Layout.js';
import Header from '../components/Header.js';
import UserCard from '../components/UserCard.js';
import LicenceCard from '../components/LicenceCard.js';
import { Button } from 'semantic-ui-react';
import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';

const Profile = (user) => {
  const userContext = useContext(UserContext);
  const [licence, setLicence] = useState(null);

  useEffect(() => {
    if (!userContext.user) return;
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db
        .collection('licences')
        .where('userId', '==', userContext.user.uid)
        .get();
      if (data.docs.length > 0) {
        setLicence(data.docs[0].data());
      }
    };
    fetchData();
  }, [userContext.user]);

  return (
    <div className='profile'>
      <Header />
      <div></div>
      <div className='user'>
        <div className='profile-usercard'>
          <UserCard />
        </div>
        <div className='profile-licences'>
          <h2>Vámi vlastněná licence</h2>
          <LicenceCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
