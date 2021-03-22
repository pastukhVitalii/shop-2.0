import firebase from 'firebase';

import { ProductType } from '../BLL-redux/productsReducer';
import { ref } from '../index';
import { LoginType } from '../scenes/Login';

export const api = {
  getProducts() {
    return new Promise((res) => {
      ref.on('value', (snapshot) => {
        res(snapshot.val());
      });
    });
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

  login(data: LoginType) {
    return firebase.auth().signInWithEmailAndPassword(data.email, data.pass);
  },
  logout() {
    return firebase.auth().signOut();
  },
};
