import firebase from 'firebase';

import { ProductType } from '../BLL-redux/productsReducer';
import { ref } from '../index';
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
  byProduct(productId: string, inCart: boolean) {
    const db = firebase.database();
    // path to count
    const productItem = db.ref(`products/${productId}/inCart`);
    // write new count and read count

    return productItem.set(!inCart)
    /*return productItem.transaction(function (inCart) {
      return !inCart;
    });*/
  },
  addProducts(product: ProductType) {
    const db = firebase.database();
    const productId = product.id; // get id product
    // path to count
    const productItem = db.ref(`products/${productId}/count`);
    // write new count and read count
    return productItem.transaction(function (currentCount) {
      return currentCount + 1;
    });
  },
  deleteProducts(product: ProductType) {
    const db = firebase.database();
    const productId = product.id; // get id product
    // path to count
    const productItem = db.ref(`products/${productId}/count`);
    // write new count and read count
    return productItem.transaction(function (currentCount) {
      return currentCount - 1;
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
