// comment: let's move this file to the config/ folder
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

// comment: add a comment that we're keeping .env file in the repo for testing purposes
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
export const ref = db.ref();
