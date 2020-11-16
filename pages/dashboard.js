import firebase from '../firebaseSetup';
import next from 'next';
import { useContext, useEffect, useState } from 'react';
import UserProvider, { UserContext } from '../components/UserContext';
import Layout from '../components/Layout.js';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useContext(UserContext);
  const [users, setUsers] = useState(null);

  const loadUsers = async () => {
    const token = await userContext.user.getIdToken(true);
    const users = await axios.get('/api/list-users', {
      headers: { Authorization: 'Bearer ' + token },
    });
    setUsers(users.data);
  };

  useEffect(() => {
    if (userContext.user.getIdToken) {
      loadUsers();
    }
  }, [userContext.user]);

  return (
    <UserContext.Consumer>
      {(value) => (
        <div className='dashboard'>
          <div className='user-list'>
            {users && (
              <ul>
                {users.map((user) => (
                  <li key={user.uid}>{user.email}</li>
                ))}
              </ul>
            )}
            {!users && <h2>Načítám data..</h2>}
          </div>
          <div className='create-user-form'>
            <form className='ui form' id='signup-form'>
              <div className='field'>
                <label>Email</label>
                <input
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='field'>
                <label>Heslo</label>
                <input
                  value={password}
                  placeholder='Heslo'
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                />
              </div>
              <button
                className='ui button'
                onClick={(e) => {
                  e.preventDefault();
                  value.createUser(email, password).then(() => {
                    setEmail('');
                    setPassword('');
                    setUsers(null);
                    loadUsers();
                  });
                }}
                type='submit'
              >
                Vytvořit uživatele
              </button>
            </form>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Dashboard;
