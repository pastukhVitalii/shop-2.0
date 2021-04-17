import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase';
import { Dispatch } from 'redux';

import { api } from '../api/api';
import { UserType } from '../scenes/Login';

const initialState: InitialStateType = {
  isLoggedIn: false,
  status: "loading",
  user: {
    firstName: '',
    lastName: '',
    email: '',
    pass: '',
  }
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
    setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setUserAC(state, action: PayloadAction<{ user: UserType }>) {
      state.user = action.payload.user
    },
  },
});

export type RequestStatusType = 'loading' | 'succeeded'
type InitialStateType = {
  isLoggedIn: boolean
  status: RequestStatusType
  user: UserType
}
export const authReducer = slice.reducer;
export const { setIsLoggedInAC, setAppStatusAC, setUserAC } = slice.actions;

// thunks
export const loginTC = (user: UserType) => (dispatch: Dispatch) => {
  api
    .login(user)
    .then(() => {
      dispatch(setIsLoggedInAC({ value: true }));
    })
    .then(() => {
      dispatch(setUserAC({ user }));
    })
    .catch((error) => alert(error));
};

export const logoutTC = () => (dispatch: Dispatch) => {
  api
    .logout()
    .then(() => {
      dispatch(setIsLoggedInAC({ value: false }));
    })
    .then(() => {
      dispatch(
        setUserAC({
          user: {
            firstName: '',
            lastName: '',
            email: '',
            pass: '',
          },
        }),
      );
    })
    .catch((error) => alert(error));
};

export const registerTC = (user: UserType) => (dispatch: Dispatch) => {
  api
    .register(user)
    .then(() =>
      firebase.database().ref(`users/${firebase.auth().currentUser?.uid}`).set(user),
    )
    .then(() => dispatch(setIsLoggedInAC({ value: true })))
    .catch((error: string) => alert(error));
};

export const registerGoogleTC = () => (dispatch: Dispatch) => {
  let user: UserType;
  api
    .registerGoogle()
    .then((res) => {
      user = {
        firstName: res.user?.displayName?.split(' ')[0],
        lastName: res.user?.displayName?.split(' ')[1],
        email: res.user?.email || '',
        pass: '222222',
      };
    })
    .then(() =>
      firebase.database().ref(`users/${firebase.auth().currentUser?.uid}`).set(user),
    )
    .then(() => dispatch(setIsLoggedInAC({ value: true })))
    .catch((error) => {
      alert(error.message);
    });
};

export const initializeUserTC = () => (dispatch: Dispatch) => {
  api.initializeUser()
    .then((res: any) => {
      dispatch(setUserAC({ user: res.value }));
      dispatch(setIsLoggedInAC({ value: true }));
    })
    .catch((error) => alert(error))
};