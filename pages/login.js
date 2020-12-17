import next from 'next';
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
          <Image
            src='/logo.svg'
            alt='Rehamza'
            size='medium'
            className='login-rehamza-img'
          ></Image>
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
            <Button
              onClick={() => value.emailLogin(email, password, '/profile')}
              type='submit'
              size='big'
            >
              Přihlásit
            </Button>
          </Form>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Login;
