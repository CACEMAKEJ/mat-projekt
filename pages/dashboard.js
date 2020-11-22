import firebase from '../firebaseSetup';
import next from 'next';
import { useContext, useEffect, useState } from 'react';
import UserProvider, { UserContext } from '../components/UserContext';
import Layout from '../components/Layout.js';
import axios from 'axios';
import { Icon, Loader, Modal } from 'semantic-ui-react';

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useContext(UserContext);
  const [users, setUsers] = useState(null);
  const [licences, setLicences] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('licences').get();
      setLicences(data.docs.map((doc) => doc.data()));
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <UserContext.Consumer>
      {(value) => (
        <div className='dashboard'>
          <div className='user-list-container'>
            <div className='user-list'>
              {users && (
                <table className='ui celled table'>
                  <thead class=''>
                    <tr class=''>
                      <th class=''>Email</th>
                      <th class=''>UId</th>
                      <th class=''>Datum posledního přihlášení</th>
                      <th class=''>Je admin?</th>
                      <th class=''>Licence</th>
                    </tr>
                  </thead>

                  <tbody class=''>
                    {users.map((user) => (
                      <tr key={user.uid}>
                        <td>{user.email}</td>
                        <td>{user.uid}</td>
                        {user.lastSignIn ? (
                          <td>
                            {user.lastSignIn &&
                              new Date(user.lastSignIn).toLocaleDateString(
                                'cs-CZ',
                              )}
                          </td>
                        ) : (
                          <td class='negative'>
                            Uživatel nebyl dosud přihlášen
                          </td>
                        )}
                        <td class='center aligned'>
                          {user.isAdmin ? (
                            <Icon color='green' name='checkmark' size='large' />
                          ) : (
                            <Icon color='red' name='close' size='large' />
                          )}
                        </td>
                        <td>
                          {licences
                            .filter((licence) => licence.userId === user.uid)
                            .map((licence) => (
                              <li key={licence.product}>
                                {licence.product}
                                <br />
                                {licence.expDate
                                  .toDate()
                                  .toLocaleDateString('cs-CZ')}
                              </li>
                            ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {!users && <h2>Načítám data..</h2>}
            </div>
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
