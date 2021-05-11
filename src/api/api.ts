import firebase from 'firebase';

import { ref } from '../config/firebaseConfig';
import { UserType } from '../scenes/Login';

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const api = {
  getProducts() {
    return new Promise((res) => {
      ref.on('value', (snapshot) => {
        res(snapshot.val());
      });
    });
  },
  login(data: UserType) {
    return firebase.auth().signInWithEmailAndPassword(data.email, data.pass);
  },
  logout() {
    return firebase.auth().signOut();
  },
  register(data: UserType) {
    return firebase.auth().createUserWithEmailAndPassword(data.email, data.pass);
  },
  registerGoogle() {
    return firebase.auth().signInWithPopup(googleProvider);
  },
  initializeUser() {
    return new Promise((res) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user?.uid) {
          const db = firebase.database();
          const name = db.ref(`users/${user?.uid}/`);
          name.on('value', (snapshot) => {
            res({ value: snapshot.val() });
          });
        }
      });
    });
  },
};