import next from 'next';
import Link from 'next/link';
import { Form, Button, Image } from 'semantic-ui-react';
import { useState } from 'react';
import UserProvider, { UserContext } from '../components/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <UserContext.Consumer>
      {(value) => (
        <div className='login-container'>
          <div className='login-form'>
            <Image
              src='/logo.svg'
              alt='Rehamza'
              size='medium'
              className='login-rehamza-img'
            ></Image>
            <h2>Přihlášení</h2>
            <Form size='huge'>
              <Form.Field>
                <label>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='example@example.com'
                />
              </Form.Field>
              <Form.Field>
                <label>Heslo</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                />
              </Form.Field>
              <div className='login-form-footer'>
                <Button
                  className='ui button'
                  onClick={() => value.emailLogin(email, password, '/profile')}
                  type='submit'
                  size='big'
                >
                  Přihlásit
                </Button>
                <Link href='/register'>
                  <a>Ještě nemáte účet?</a>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Login;
