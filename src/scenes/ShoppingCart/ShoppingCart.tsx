import {Collapse, Grid, Typography} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addProductsTC,
  changeProductStatusTC,
  deleteProductsTC,
  ProductType,
} from '../../BLL-redux/productsReducer';
import { AppRootStateType } from '../../BLL-redux/store';
import { Form } from '../../components/Form';
import { ShoppingBlank } from '../../components/ShoppingBlank';

export const ShoppingCart = React.memo(function () {

  const products = useSelector<AppRootStateType, Array<ProductType>>(
    (state) => state.products,
  );

  const dispatch = useDispatch();

  const increaseProduct = useCallback(
    function (id: string) {
      const thunk = addProductsTC(id);
      dispatch(thunk);
    },
    [dispatch],
  );

  const decreaseProducts = useCallback(
    function (id: string) {
      const thunk = deleteProductsTC(id);
      dispatch(thunk);
    },
    [dispatch],
  );

  const deleteProducts = useCallback(
    function (id: string, inCart: boolean) {
      dispatch(changeProductStatusTC(id, inCart));
    },
    [dispatch],
  );
  const productsForm = products.filter((p) => {
    return p.inCart;
  });

  const [alert, setAlert] = useState(false);

  const productsM = productsForm.map((p) => {
    return (
      <ShoppingBlank
        key={p.id}
        products={p}
        increaseProducts={increaseProduct}
        decreaseProducts={decreaseProducts}
        deleteProducts={deleteProducts}
        setAlert={setAlert}
      />
    );
  });

  return (
    <>
      <Collapse in={alert}>
        <Alert onClose={() => setAlert(false)}>Delete!</Alert>
      </Collapse>
      <Grid container spacing={4} justify={'center'}>
        <Grid item xs={12} md={8} lg={7}>
          {productsM.length!==0? productsM: <Typography variant="h4">Card is empty</Typography>}
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Form products={productsForm} />
        </Grid>
      </Grid>
    </>
  );
});
