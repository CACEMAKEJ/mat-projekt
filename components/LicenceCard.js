import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { UserContext } from '../components/UserContext';
import { useContext, useState, useEffect } from 'react';
import firebase from '../firebaseSetup';

const LicenceCard = () => {
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
    <UserContext.Consumer>
      {(value) => (
        <Card>
          <Card.Content>
            <Card.Header>
              {licence && <h2>{licence.products.join(',')}</h2>}
            </Card.Header>
            <Card.Description>
              {licence && (
                <p>
                  Do vypršení licence zbývá{' '}
                  {Math.floor(
                    (licence.expDate.toDate().getTime() -
                      new Date().getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}{' '}
                  dní
                </p>
              )}
            </Card.Description>
          </Card.Content>
        </Card>
      )}
    </UserContext.Consumer>
  );
};

export default LicenceCard;
