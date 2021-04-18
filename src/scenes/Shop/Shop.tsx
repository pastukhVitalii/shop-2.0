import { Grid, Paper } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeProductStatusTC, ProductType } from '../../BLL-redux/productsReducer';
import { AppRootStateType } from '../../BLL-redux/store';
import { CardBlank } from '../../components/CardBlank';
import { Message } from '../../components/Message';
import { useStyles } from './index';

export const Shop = React.memo(function () {
  const classes = useStyles();

  const products = useSelector<AppRootStateType, Array<ProductType>>(
    (state) => state.products,
  );

  const dispatch = useDispatch();

  const changeProductStatus = useCallback(
    function (id: string, inCart: boolean) {
      dispatch(changeProductStatusTC(id, inCart));
    },
    [dispatch],
  );

  return (
    <>
      <Message />
      <Grid container spacing={1} justify="center">
        {products.map((p) => {
          return (
            <Paper key={p.id} className={classes.card}>
              <CardBlank products={p} addProducts={changeProductStatus} />
            </Paper>
          );
        })}
      </Grid>
    </>
  );
});
