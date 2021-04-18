import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { api } from '../api/api';
import {setAppStatusAC} from "./auth-reducer";

export type ProductType = {
  id: string;
  title: string;
  price: number;
  count: number;
  urlImg: string;
  inCart: boolean;
  img: string
};

const initialState: Array<ProductType> = [];

export const slice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    changeProductStatusAC(
      state,
      action: PayloadAction<{ id: string; inCart: boolean }>,
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].inCart = !action.payload.inCart;
    },
    addProductAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].count = state[index].count + 1;
    },
    deleteProductAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].count = state[index].count - 1;
    },
    getProductsAC(state, action: PayloadAction<{ products: Array<ProductType> }>) {
      return action.payload.products.map((tl) => ({ ...tl }));
    },
  },
});

export const {
  changeProductStatusAC,
  addProductAC,
  deleteProductAC,
  getProductsAC,
} = slice.actions;

export const productsReducer = slice.reducer;

export const getProductsTC = () => (dispatch: Dispatch) => {
  api.getProducts()
    .then((res: any) => {
      dispatch(getProductsAC(res));
      dispatch(setAppStatusAC({status: "succeeded"}))
    })
    .catch((error) => alert(error));
};

export const changeProductStatusTC = (id: string, inCart: boolean) => (
  dispatch: Dispatch,
) => {
  if (inCart) {
    dispatch(deleteProductAC({ id }));
    dispatch(changeProductStatusAC({ id, inCart }));
  } else {
    dispatch(addProductAC({ id }));
    dispatch(changeProductStatusAC({ id, inCart }));
  }
};

export const addProductsTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(addProductAC({ id }));
};

export const deleteProductsTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(deleteProductAC({ id }));
};