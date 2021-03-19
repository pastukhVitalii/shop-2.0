import { Collapse, Grid, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductsTC, ProductType } from '../../BLL-redux/productsReducer';
import { AppRootStateType } from '../../BLL-redux/store';
import { CardBlank } from '../../components/CardBlank/CardBlank';

import './Shop.css';

type PropsType = {
    products?: Array<ProductType> // type for storybook
    addProducts?: (value: any) => void // type for storybook
};

export const Shop = React.memo(function (props: PropsType) {
  console.log('render Shop');

  const products = useSelector<AppRootStateType, Array<ProductType>>(
    (state) => state.products
  );

  const dispatch = useDispatch();

  const addProduct = useCallback(
    function (products: ProductType) {
      const thunk = addProductsTC(products);
      dispatch(thunk);
    },
    [dispatch],
  );

  let [alert, setAlert] = useState(false);

  return (
    <>
      <Collapse in={alert}>
        <Alert onClose={() => setAlert(false)}>In cart!</Alert>
      </Collapse>
      <Grid container spacing={1} justify="center">
        {products.map((p) => {
          return (
            <Paper
              key={p.id}
              style={{
                backgroundColor: 'blue',
                margin: '30px',
                width: '300px',
                height: '400px',
              }}
            >
              <CardBlank
                products={p}
                addProducts={addProduct}
                setAlert={setAlert}
              />
            </Paper>
          );
        })}
      </Grid>
    </>
  );
});
