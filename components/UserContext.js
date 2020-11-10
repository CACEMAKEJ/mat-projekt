import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';

import cookie from 'js-cookie';
import firebase from '../firebaseSetup';

export const UserContext = React.createContext();

const tokenName = 'firebaseToken';

const UserProvider = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser);

  const router = useRouter();

  const emailLogin = async (email, password, redirectPath) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push(redirectPath);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = async (redirectPath) => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        router.push(redirectPath);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createUser = async (email, password) => {
    const token = await user.getIdToken(true);
    await axios.post(
      '/api/create-user',
      { email, password },
      { headers: { Authorization: 'Bearer ' + token } },
    );
  };

  const onAuthStateChange = () => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        cookie.set(tokenName, token, { expires: 14 });
        setUser(user);
      } else {
        cookie.remove(tokenName);
        console.log('Logged out.');
        setUser(null);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ emailLogin, logout, user, createUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
