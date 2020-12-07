import firebase from '../firebaseSetup';
import { useContext, useEffect, useState } from 'react';

function list() {
  const [licences, setLicences] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('licences').get();
      setLicences(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);
  return (
    <ul>
      {licences.map((licence) => (
        <li key={licence.product}>{licence.product}</li>
      ))}
    </ul>
  );
}

export default list;
