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
import React, { useContext } from 'react';

import { ProductType } from '../../BLL-redux/products-reducer';
import { Context, setMessageAC } from '../../context/context';
import { useStyles } from './index';

export type PropsType = {
  products: ProductType;
  increaseProducts: (id: string) => void;
  decreaseProducts: (id: string) => void;
  deleteProducts: (id: string, inCart: boolean) => void;
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

  const { contextDispatch } = useContext<any>(Context);

  const onDeleteItem = () => {
    props.deleteProducts(props.products.id, props.products.inCart);
    contextDispatch(setMessageAC(true));
    setTimeout(() => {
      contextDispatch(setMessageAC(false));
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
            <Typography className={classes.price}>
              price: {props.products.price} $
            </Typography>
          </CardContent>
        </Grid>
        <Grid container item xs={3}>
          <Grid container justify="center">
            <CardActions>
              {/* comment: 1 should be in constants */}
              {props.products.count > 1 ? (
                <IconButton onClick={onDecreaseItem} aria-label="decrease">
                  <Remove />
                </IconButton>
              ) : (
                <IconButton onClick={onDeleteItem} aria-label="delete">
                  <DeleteForever />
                </IconButton>
              )}
              <div>{props.products.count}</div>
              <IconButton
                onClick={onIncreaseItem}
                disabled={props.products.count >= 10}
                aria-label="increase"
              >
                <Add />
                {/* comment: 10 should be in constants */}
                {props.products.count === 10 ? (
                  <div className={classes.error}>Max count !!</div>
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