import {combineReducers} from "redux";
import {productsReducer} from "./productsReducer";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import {authReducer} from "./auth-reducer";

const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
  form: formReducer
})

export type RootReducerType = typeof rootReducer

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store