import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
const firebaseConfig = {
  apiKey: "AIzaSyD19A3jRjoprlCZcQFsRFF1pyjF1bjOzjQ",
  authDomain: "wallet-30ddb.firebaseapp.com",
  projectId: "wallet-30ddb",
  storageBucket: "wallet-30ddb.appspot.com",
  messagingSenderId: "737691894403",
  appId: "1:737691894403:web:f181918f1347bf862a11b6",
  measurementId: "G-1DTTC8NQFT"
};

  // Initialize Firebase
const fire=  firebase.initializeApp(firebaseConfig);
const auth= fire.auth();
const db=fire.firestore();
const database=fire.database();
export {auth,db,database}