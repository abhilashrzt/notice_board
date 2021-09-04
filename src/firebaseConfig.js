import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDOP0H8Ig5WNC_xgmlX-zya-GOyKqmPJXE",
    authDomain: "notice-board-e41e4.firebaseapp.com",
    projectId: "notice-board-e41e4",
    storageBucket: "notice-board-e41e4.appspot.com",
    messagingSenderId: "736943635798",
    appId: "1:736943635798:web:362a3de94b703f026caaf7"
  };
  
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firebaseDb = firebase.database();

export {storage, firebaseDb};