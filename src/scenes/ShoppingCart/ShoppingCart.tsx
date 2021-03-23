import { Grid } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addProductsTC, byProductTC,
  deleteProductsTC,
  ProductType,
} from '../../BLL-redux/productsReducer';
import { AppRootStateType } from '../../BLL-redux/store';
import { Form } from '../../components/Form';
import { ShoppingBlank } from '../../components/ShoppingBlank';

import './ShoppingCart.css';

type PropsType = {};

export const ShoppingCart = React.memo(function (props: PropsType) {
  console.log('render Shopping Cart');

  const products = useSelector<AppRootStateType, Array<ProductType>>(
    (state) => state.products,
  );

  const dispatch = useDispatch();

  const increaseProduct = useCallback(
    function (products: ProductType) {
      const thunk = addProductsTC(products);
      dispatch(thunk);
    },
    [dispatch],
  );

  const decreaseProducts = useCallback(
    function (products: ProductType) {
      const thunk = deleteProductsTC(products);
      dispatch(thunk);
    },
    [dispatch],
  );

  const deleteProducts = useCallback(
    function (id: string, inCart: boolean) {
      dispatch(byProductTC(id, inCart));
    },
    [dispatch],
  );
  const productsF = products.filter((p) => {
    return p.inCart;
  });

  const productsM = productsF.map((p) => {
    return (
      <ShoppingBlank
        key={p.id}
        products={p}
        increaseProducts={increaseProduct}
        decreaseProducts={decreaseProducts}
        deleteProducts={deleteProducts}
      />
    );
  });

  return (
    <Grid container spacing={4} justify={'center'}>
      <Grid item xs={12} md={8} lg={7}>
        {productsM}
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Form products={productsF} />
      </Grid>
    </Grid>
  );
});