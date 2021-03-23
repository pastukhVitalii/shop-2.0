import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { api } from '../api/api';
import { ref } from '../index';

export type ProductType = {
  id: string;
  title: string;
  price: number;
  count: number;
  urlImg: string;
  inCart: boolean;
};

const initialState: Array<ProductType> = [];

export const slice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    byProductAC(state, action: PayloadAction<{ id: string; inCart: boolean }>) {
      debugger
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      state[index].inCart = !action.payload.inCart;
    },
    addProductAC(state, action: PayloadAction<{ products: Array<ProductType> }>) {
      return action.payload.products;
    },
    deleteProductAC(state, action: PayloadAction<{ products: Array<ProductType> }>) {
      return action.payload.products;
    },
    getProductsAC(state, action: PayloadAction<{ products: Array<ProductType> }>) {
      return action.payload.products.map((tl) => ({ ...tl }));
    },
  },
});

export const {
  byProductAC,
  addProductAC,
  deleteProductAC,
  getProductsAC,
} = slice.actions;

export const productsReducer = slice.reducer;

export const getProductsTC = () => {
  return (dispatch: Dispatch<any>) => {
    ref.on('value', (snapshot) => {
      console.log(snapshot.val());
      dispatch(getProductsAC(snapshot.val()));
    });
  };
};

/*export const getProductsTC = () => (dispatch: Dispatch) => {
  api.getProducts()
    .then((res: any) => {
      dispatch(getProductsAC(res));
    })
    .catch((error) => alert(error));
};*/

export const byProductTC = (id: string, inCart: boolean) => (dispatch: Dispatch) => {
   api
    .byProduct(id, inCart)
    .then(() => {
      dispatch(byProductAC({ id, inCart }));
    })
    .catch((error) => alert(error));
};

export const addProductsTC = (products: ProductType) => (dispatch: Dispatch) => {
  api
    .addProducts(products)
    .then((res) => {
      dispatch(addProductAC(res));
    })
    .catch((error) => alert(error));
};

export const deleteProductsTC = (products: ProductType) => (dispatch: Dispatch) => {
  api
    .deleteProducts(products)
    .then((res) => {
      dispatch(deleteProductAC(res));
    })
    .catch((error) => alert(error));
};
