import firebase from '../firebaseSetup';
import next from 'next';
import { useContext, useEffect, useState } from 'react';
import UserProvider, { UserContext } from '../components/UserContext';
import Layout from '../components/Layout.js';
import axios from 'axios';
import {
  Icon,
  Loader,
  Modal,
  Table,
  TableCell,
  Dimmer,
  Image,
  Segment,
} from 'semantic-ui-react';

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
          <div className='user-list'>
            {users && (
              <Table celled selectable size='large' className='user-table'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Uid</Table.HeaderCell>
                    <Table.HeaderCell>
                      Datum posledního přihlášení
                    </Table.HeaderCell>
                    <Table.HeaderCell>Je admin?</Table.HeaderCell>
                    <Table.HeaderCell>Licence</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {users.map((user) => (
                    <Table.Row key={user.uid}>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.uid}</Table.Cell>
                      {user.lastSignIn ? (
                        <Table.Cell>
                          {user.lastSignIn &&
                            new Date(user.lastSignIn).toLocaleDateString(
                              'cs-CZ',
                            )}
                        </Table.Cell>
                      ) : (
                        <Table.Cell negative>
                          Uživatel nebyl dosud přihlášen
                        </Table.Cell>
                      )}
                      <Table.Cell class='center aligned'>
                        {user.isAdmin ? (
                          <Icon color='green' name='checkmark' size='large' />
                        ) : (
                          <Icon color='red' name='close' size='large' />
                        )}
                      </Table.Cell>
                      <Table.Cell>
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
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
            {!users && (
              <Segment>
                <Dimmer active inverted>
                  <Loader size='large'>Načítám data</Loader>
                </Dimmer>

                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Segment>
            )}
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
