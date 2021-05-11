import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';

import { authReducer } from './auth-reducer';
import { productsReducer } from './products-reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootReducerType = typeof rootReducer;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware],
});

export const persistor = persistStore(store);

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>;
