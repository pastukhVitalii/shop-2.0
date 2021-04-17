import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { authReducer } from './auth-reducer';
import { productsReducer } from './productsReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
});

export type RootReducerType = typeof rootReducer;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['products/addProductAC', 'products/deleteProductAC'],
      },
    }).prepend(thunkMiddleware),
});

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;
