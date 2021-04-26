// comment: .idea, .firebase should be in .gitignore

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from './BLL-redux/store';
import reportWebVitals from './reportWebVitals';
import { AppShop } from './scenes/AppShop';

import './index.css';
import {StoreGlobal} from "./context/context";

ReactDOM.render(
  <Provider store={store}>
    <StoreGlobal>
      <BrowserRouter>
      {/* comment: can we remove or uncomment it? */}
      {/*<React.StrictMode>*/}  
      <AppShop/>
      {/*</React.StrictMode>*/}
    </BrowserRouter>
    </StoreGlobal>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
