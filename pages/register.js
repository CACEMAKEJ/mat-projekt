import next from 'next';
import Link from 'next/link';
import { Form, Button, Image } from 'semantic-ui-react';
import { useState } from 'react';
import UserProvider, { UserContext } from '../components/UserContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <UserContext.Consumer>
      {(value) => (
        <div className='register-container'>
          <div className='create-user-form'>
            <Image
              src='/logo.svg'
              alt='Rehamza'
              size='medium'
              className='login-rehamza-img'
            ></Image>
            <h2>Registrace</h2>
            <Form size='huge'>
              <Form.Field>
                <label>Email</label>
                <input
                  value={email}
                  placeholder='example@example.com'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Heslo</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                />
              </Form.Field>
              <div className='create-user-form-footer'>
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
                  Zaregistrovat
                </Button>
                <Link href='/login'>
                  <a>Máte již účet?</a>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Register;
