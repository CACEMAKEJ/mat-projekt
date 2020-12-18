import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDdW-Wl6GiIt5nRI8J7dncIXPEaFFb16x4',
  authDomain: 'rehamza-mprj.firebaseapp.com',
  databaseURL: 'https://rehamza-mprj.firebaseio.com',
  projectId: 'rehamza-mprj',
  storageBucket: 'rehamza-mprj.appspot.com',
  messagingSenderId: '112940981545',
  appId: '1:112940981545:web:24289e2e63079c082fab38',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
