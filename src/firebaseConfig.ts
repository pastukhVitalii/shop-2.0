import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

/*const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};*/

const firebaseConfig = {
  apiKey: "AIzaSyCyp1Pz2WeJIcMlqCAUZm8AyLhsu8RsGfk",
  authDomain: "shop2-828f9.firebaseapp.com",
  databaseURL: "https://shop2-828f9.firebaseio.com",
  projectId: "shop2-828f9",
  storageBucket: "shop2-828f9.appspot.com",
  messagingSenderId: "378927493383",
  appId: "1:378927493383:web:17d396de2c3714e7c795a2",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
export const ref = db.ref();
