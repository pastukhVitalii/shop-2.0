import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { api } from '../api/api';
import { UserType } from '../scenes/Login';
import { setIsLoggedInAC } from './auth-reducer';

const initialState: UserType = {
  firstName: '',
  lastName: '',
  email: '',
  pass: '',
};

export const slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserAC(state, action: PayloadAction<{ user: UserType }>) {
      return action.payload.user;
    },
  },
});

export const { setUserAC } = slice.actions;
export const userReducer = slice.reducer;

export const initializeUserTC = () => (dispatch: Dispatch) => {
  api.initializeUser()
    .then((res: any) => {
    dispatch(setUserAC({ user: res.value }));
    dispatch(setIsLoggedInAC({ value: true }));
  })
    .catch((error) => alert(error))
};
