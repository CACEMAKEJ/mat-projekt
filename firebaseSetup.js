import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyARvR5IoBnOtRJ8g5Djfr7PKeXtGk4s1So",
    authDomain: "rehamza-mprj.firebaseapp.com",
    databaseURL: "https://rehamza-mprj.firebaseio.com",
    projectId: "rehamza-mprj",
    storageBucket: "rehamza-mprj.appspot.com",
    messagingSenderId: "112940981545",
    appId: "1:112940981545:web:24289e2e63079c082fab38"
};

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;