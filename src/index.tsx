import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './redux/store';
import { AppShop } from './scenes/AppShop';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <AppShop />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
