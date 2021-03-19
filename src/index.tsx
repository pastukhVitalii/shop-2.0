import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./BLL-redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import {AppShop} from "./scenes/AppShop";

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

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <AppShop />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
