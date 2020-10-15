import firebase from 'firebase/app'
import 'firebase/firestore'

export function loadFirebase(){
    try{ 
        const firebaseConfig = {
            apiKey: "AIzaSyARvR5IoBnOtRJ8g5Djfr7PKeXtGk4s1So",
            authDomain: "rehamza-mprj.firebaseapp.com",
            databaseURL:"https://rehamza-mprj.firebaseio.com",
            projectId: "rehamza-mprj",
            storageBucket: "rehamza-mprj.appspot.com",
            messagingSenderId: "112940981545",
        }
        firebase.initializeApp(firebaseConfig)
    }   catch (error) {
        if(!/already exists/.test(error.message)) {
            console.log('Firebase didnt initialize correctly: ${error.message')
        }
    }
    return firebase
}
