import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import cookie from 'js-cookie';
import firebase from '../firebaseSetup';

export const UserContext = React.createContext();

const tokenName = 'firebaseToken';

const UserProvider = ({ children, initialUser }) => {

  const [user, setUser] = useState(initialUser);

  const router = useRouter()

  const emailLogin = async (email, password, redirectPath) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {

        router.push(redirectPath)
       
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
        router.push(redirectPath)   
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onAuthStateChange = () => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        cookie.set(tokenName, token, { expires: 14 });
        setUser(user);
      } else {
        cookie.remove(tokenName);
        console.log('Logged out.')
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

  return <UserContext.Provider value={{ emailLogin, logout, user }}>{children}</UserContext.Provider>;
};

export default UserProvider;