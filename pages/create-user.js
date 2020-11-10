import firebase from '../firebaseSetup';
import next from 'next';
import { useState } from 'react';
import UserProvider, { UserContext } from '../components/UserContext';
import Layout from '../components/Layout.js';

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <UserContext.Consumer>
      {(value) => (
        <div className='create-user'>
          <div className='create-user-form'>
            <form className='ui form' id='signup-form'>
              <div className='field'>
                <label>Email</label>
                <input
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='field'>
                <label>Heslo</label>
                <input
                  placeholder='Heslo'
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                />
              </div>
              <button
                className='ui button'
                onClick={(e) => {
                  e.preventDefault();
                  value.createUser(email, password);
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

export default CreateUser;
