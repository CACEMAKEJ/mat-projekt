import firebase from '../firebaseSetup';
import next from 'next';
import { useContext, useEffect, useState } from 'react';
import UserProvider, { UserContext } from '../components/UserContext';
import Layout from '../components/Layout.js';
import Select from 'react-select';
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
  Button,
  Form,
  Menu,
} from 'semantic-ui-react';

const Dashboard = () => {
  const today = new Date();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useContext(UserContext);
  const [users, setUsers] = useState(null);
  const [licences, setLicences] = useState([]);
  const [licenceUserId, setLicenceUserId] = useState('');
  const [products, setProducts] = useState([]);
  const [expDate, setExpDate] = useState(
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
  );

  const options = [
    { value: 'balancePad', label: 'Balanční plošina' },
    { value: 'eyeTracker', label: 'Oční senzor' },
    { value: 'futureCube', label: 'Future Cube' },
  ];

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
    };
    fetchData();
  }, []);

  const createLicence = async (licenceUserId, products, expDate) => {
    const db = firebase.firestore();
    const splitDate = expDate.split('-');
    const data = {
      products,
      userId: licenceUserId,
      expDate: firebase.firestore.Timestamp.fromDate(
        new Date(splitDate[0], splitDate[1] - 1, splitDate[2]),
      ),
    };

    const res = await db.collection('licences').doc(licenceUserId).set(data);
  };

  return (
    <UserContext.Consumer>
      {(value) => (
        <div className='dashboard'>
          <div className='forms'>
            <div className='create-user-form'>
              <h2>Vytvořit uživatele</h2>
              <Form>
                <Form.Field>
                  <label>Email</label>
                  <input
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Heslo</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Heslo'
                    type='password'
                  />
                </Form.Field>
                <Button
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
                </Button>
              </Form>
            </div>
            <div className='create-lincence-form'>
              <h2>Vytvořit licenci</h2>
              <Form>
                <Select
                  instanceId='select'
                  isMulti
                  options={options}
                  onChange={(value) => {
                    setProducts(value.map((option) => option.value));
                  }}
                  placeholder='Vyber produkt'
                  closeMenuOnSelect={false}
                />
                <Form.Field>
                  <label>ID uživatele</label>
                  <input
                    value={licenceUserId}
                    onChange={(e) => setLicenceUserId(e.target.value)}
                    placeholder='ID uživatele'
                  />
                </Form.Field>
                <Form.Field>
                  <label>Datum vypršení licence</label>
                  <input
                    type='date'
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                  ></input>
                </Form.Field>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    createLicence(licenceUserId, products, expDate).then(() => {
                      setLicenceUserId('');
                      setProducts([]);
                      const today = new Date();
                      setExpDate(
                        today.getFullYear() +
                          '-' +
                          (today.getMonth() + 1) +
                          '-' +
                          today.getDate(),
                      );
                    });
                  }}
                  type='submit'
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div>
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
                      {user.isAdmin ? (
                        <Table.Cell positive>Je admin</Table.Cell>
                      ) : (
                        <Table.Cell negative>Není admin</Table.Cell>
                      )}
                      <Table.Cell>
                        <p>
                          {licences
                            .filter(
                              (licence) =>
                                licence.userId.trim() === user.uid.trim(),
                            )
                            .map((licence) => licence.products)
                            .join(',')}
                        </p>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan='5'>
                      <Menu floated='right' pagination>
                        <Menu.Item as='a' icon>
                          <Icon name='chevron left' />
                        </Menu.Item>
                        <Menu.Item as='a'>1</Menu.Item>
                        <Menu.Item as='a'>2</Menu.Item>
                        <Menu.Item as='a'>3</Menu.Item>
                        <Menu.Item as='a'>4</Menu.Item>
                        <Menu.Item as='a' icon>
                          <Icon name='chevron right' />
                        </Menu.Item>
                      </Menu>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            )}
            {!users && (
              <Segment>
                <Dimmer active inverted>
                  <Loader size='massive'>Načítám data</Loader>
                </Dimmer>

                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Segment>
            )}
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Dashboard;
