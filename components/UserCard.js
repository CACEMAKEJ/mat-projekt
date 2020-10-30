import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { UserContext } from '../components/UserContext';

const UserCard = () => (
  <UserContext.Consumer>
    {(value) => (
      <Card>
        <Card.Content>
          <Card.Header>
            <h2>{value.user.email}</h2>
          </Card.Header>
          <Card.Description>
            <p>{value.user.uid}</p>
          </Card.Description>
        </Card.Content>
      </Card>
    )}
  </UserContext.Consumer>
);

export default UserCard;
