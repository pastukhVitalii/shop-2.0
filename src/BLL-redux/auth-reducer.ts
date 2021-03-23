import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { api } from '../api/api';
import { LoginType } from '../scenes/Login';

const initialState = {
  isLoggedIn: false,
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
});

export const authReducer = slice.reducer;
export const { setIsLoggedInAC } = slice.actions;

// thunks
export const loginTC = (data: LoginType) => (dispatch: Dispatch) => {
  api
    .login(data)
    .then(() => {
      dispatch(setIsLoggedInAC({ value: true }));
    })
    .catch((error) => alert(error));
};

export const logoutTC = () => (dispatch: Dispatch) => {
  api
    .logout()
    .then(() => {
      dispatch(setIsLoggedInAC({ value: false }));
    })
    .catch((error) => alert(error));
};