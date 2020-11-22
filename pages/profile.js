import firebase from '../firebaseSetup';
import UserProvider, { UserContext } from '../components/UserContext';
import Layout from '../components/Layout.js';
import Header from '../components/Header.js';
import UserCard from '../components/UserCard.js';
import { Button } from 'semantic-ui-react';

const Profile = (user) => {
  return (
    <div className='profile'>
      <div>
        <UserContext.Consumer>
          {(value) =>
            !value.user && (
              <Link href='/login'>
                <Button
                  basic
                  color='black'
                  size='small'
                  style={{ fontWeight: 'bold' }}
                >
                  Přihlásit se
                </Button>
              </Link>
            )
          }
        </UserContext.Consumer>
        <UserContext.Consumer>
          {(value) =>
            value.user && (
              <Button
                onClick={value.logout}
                basic
                color='black'
                size='large'
                style={{ fontWeight: 'bold' }}
              >
                Odhlásit se
              </Button>
            )
          }
        </UserContext.Consumer>
      </div>
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
