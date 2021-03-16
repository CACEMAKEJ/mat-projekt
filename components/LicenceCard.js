import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { UserContext } from '../components/UserContext';
import { useContext, useState, useEffect } from 'react';
import firebase from '../firebaseSetup';

const LicenceCard = ({ licence }) => {
  return (
    <UserContext.Consumer>
      {(value) => (
        <Card color='orange'>
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
