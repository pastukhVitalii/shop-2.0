import {Dispatch} from 'redux'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import firebase from "firebase";
import {LoginType} from "./Login";

const initialState = {
  isLoggedIn: false
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    }
  }
})

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;

// thunks
export const loginTC = (data: LoginType) => (dispatch: Dispatch) => {

  firebase.auth().signInWithEmailAndPassword(data.email, data.pass)
    .then(res => {
      dispatch(setIsLoggedInAC({value: true}));
    })
    .catch(error => alert(error))
}

export const logoutTC = () => (dispatch: Dispatch) => {
  firebase.auth().signOut()
    .then((res) => {
      dispatch(setIsLoggedInAC({value: false}))
    })
    .catch(error => alert(error))
}

