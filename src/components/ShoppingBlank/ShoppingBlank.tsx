import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Add, DeleteForever, Remove } from '@material-ui/icons';
import React from 'react';

import { ProductType } from '../../BLL-redux/productsReducer';
import { useStyles } from './index';

export type PropsType = {
  products: ProductType;
  increaseProducts: (id: string) => void;
  decreaseProducts: (id: string) => void;
  deleteProducts: (id: string, inCart: boolean) => void;
  setAlert: (alert: boolean) => void;
};

export type CardType = {
  onIncreaseItem?: () => void;
  onDecreaseItem?: () => void;
};

export const ShoppingBlank = React.memo(function (props: PropsType & CardType) {

  const classes = useStyles();

  const onIncreaseItem = () => {
    props.increaseProducts(props.products.id);
  };

  const onDecreaseItem = () => {
    props.decreaseProducts(props.products.id);
  };

  const onDeleteItem = () => {
    props.deleteProducts(props.products.id, props.products.inCart);
    props.setAlert(true);
    setTimeout(() => {
      props.setAlert(false);
    }, 1500);
  };

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={4}>
          <CardMedia
            className={classes.media}
            image={props.products.urlImg}
            title={props.products.title}
          />
        </Grid>
        <Grid item xs={5}>
          <CardHeader title={props.products.title} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the
              mussels, if you like.
            </Typography>
            <Typography style={{ padding: '10px 0 0 10px' }}>
              price: {props.products.price} $
            </Typography>
          </CardContent>
        </Grid>
        <Grid container item xs={3}>
          <Grid container justify={'center'}>
            <CardActions>
              {props.products.count > 1 ? (
                <IconButton onClick={onDecreaseItem} aria-label='decrease'>
                  <Remove />
                </IconButton>
              ) : (
                <IconButton onClick={onDeleteItem} aria-label='delete'>
                  <DeleteForever />
                </IconButton>
              )}
              <div>{props.products.count}</div>
              <IconButton
                onClick={onIncreaseItem}
                disabled={props.products.count >= 10}
                aria-label='increase'
              >
                <Add />
                {props.products.count === 10 ? (
                  <div style={{ color: 'tomato', fontSize: '14px' }}>
                    Max count !!
                  </div>
                ) : (
                  ''
                )}
              </IconButton>
            </CardActions>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
});