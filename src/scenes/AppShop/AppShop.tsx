import { CircularProgress, Container, Grid } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProductsTC, ProductType } from '../../BLL-redux/productsReducer';
import { AppRootStateType } from '../../BLL-redux/store';
import { Header } from '../../components/Header';
import { Routes } from './components/Routes';

export const AppShop = React.memo(function () {

  const products = useSelector<AppRootStateType, Array<ProductType>>(
    (state) => state.products,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsTC());
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [dispatch]);

  const arrPrice = useMemo(() => {
    return products.map((p) => p.price * p.count);
  }, [products]);

  const totalPrice = useMemo(() => {
    return arrPrice.reduce((sum, pr) => {
      return sum + pr;
    }, 0);
  }, [arrPrice]);

  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Header totalPrice={totalPrice} />
      <Container fixed>
        {loading ? (
          <Grid container justify="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Routes />
        )}
      </Container>
    </div>
  );
});
