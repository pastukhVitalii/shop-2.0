import { CircularProgress, Container, Grid } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RequestStatusType } from '../../redux/auth-reducer';
import { getProductsTC, ProductType } from '../../redux/products-reducer';
import { AppRootStateType } from '../../redux/store';
import { Header } from '../Header';
import { Routes } from './components/Routes';
import {LOADING} from "../../utils/constants";

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
        {status === LOADING ? (
          <Grid container justify="center">
            <CircularProgress aria-live="polite" />
          </Grid>
        ) : (
          <Routes />
        )}
      </Container>
    </div>
  );
});
