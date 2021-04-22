import { CircularProgress, Container, Grid } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RequestStatusType } from '../../BLL-redux/auth-reducer';
import { getProductsTC, ProductType } from '../../BLL-redux/products-reducer';
import { AppRootStateType } from '../../BLL-redux/store';
import { Header } from '../../components/Header';
import { Routes } from './components/Routes';

export const AppShop = React.memo(function () {
  const products = useSelector<AppRootStateType, Array<ProductType>>(
    (state) => state.products,
  );

  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.auth.status,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsTC());
  }, [dispatch]);

  const arrPrice = useMemo(() => {
    return products.map((p) => p.price * p.count);
  }, [products]);

  const totalPrice = useMemo(() => {
    return arrPrice.reduce((sum, pr) => {
      return sum + pr;
    }, 0);
  }, [arrPrice]);

  return (
    <div>
      <Header totalPrice={totalPrice} />
      <Container fixed>
        {status === 'loading' ? (
          <Grid container justify="center">
            <CircularProgress aria-live="polite"/>
          </Grid>
        ) : (
            <Routes />
        )}
      </Container>
    </div>
  );
});