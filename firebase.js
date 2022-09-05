
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBBvTLykatyvcDlLFsStakR1r5_bWnV310",
  authDomain: "catalogue-cat.firebaseapp.com",
  projectId: "catalogue-cat",
  storageBucket: "catalogue-cat.appspot.com",
  messagingSenderId: "577719762026",
  appId: "1:577719762026:web:e6f10afa0aebb260fc1e13",
  measurementId: "G-C2K4DQYXB1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export {  db };
