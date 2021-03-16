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
    const yeet = firebase
      .firestore()
      .collection('licences')
      .where('userId', '==', userContext.user.uid)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          setLicence(snapshot.docs[0].data());
        }
      });
    return () => {
      yeet();
    };
  }, [userContext.user]);

  return (
    <Layout>
      <div className='user'>
        <div className='profile-usercard'>
          <UserCard />
        </div>
        <div className='profile-licences'>
          <h2 className='card-description'>Vámi vlastněná licence</h2>
          <LicenceCard licence={licence} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
