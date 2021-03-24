import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  createStyles,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, DeleteForever, Remove } from '@material-ui/icons';
import React from 'react';

import { ProductType } from '../../BLL-redux/productsReducer';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: '100%',
      marginTop: '30px',
    },
    media: {
      height: '100%',
      margin: '0 auto',
    },
  }),
);

export type PropsType = {
  products: ProductType;
  increaseProducts: (products: ProductType) => void;
  decreaseProducts: (products: ProductType) => void;
  deleteProducts: (id: string, inCart: boolean) => void
};

export type CardType = {
  onIncreaseItem?: () => void;
  onDecreaseItem?: () => void;
};

export const ShoppingBlank = React.memo(function (props: PropsType & CardType) {
  console.log('render Shopping blank');
  const classes = useStyles();

  const onIncreaseItem = () => {
    props.increaseProducts(props.products);
  };

  const onDecreaseItem = () => {
    props.decreaseProducts(props.products);
  };

  const onDeleteItem = () => {
    props.deleteProducts(props.products.id, props.products.inCart);
    /*props.setAlert(true);
    setTimeout(() => {
      props.setAlert(false);
    }, 1500);*/
  }

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
                <IconButton
                  onClick={onDecreaseItem}
                >
                  <Remove />
                </IconButton>
              ) : (
                <IconButton onClick={onDeleteItem}>
                  <DeleteForever />
                </IconButton>
              )}
              <div>{props.products.count}</div>
              <IconButton onClick={onIncreaseItem} disabled={props.products.count >= 10}>
                <Add />{' '}
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