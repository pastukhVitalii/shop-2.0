import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import React from 'react';

import { ProductType } from '../../BLL-redux/productsReducer';
import { useStyles } from './index';

export type PropsType = {
  products: ProductType;
  addProducts: (id: string, inCart: boolean) => void;
  setAlert: (alert: boolean) => void;
};
export type CardType = {
  onAddItem?: (id: string, inCart: boolean) => void;
  onDeleteItem?: () => void;
};

export const CardBlank = React.memo(function (props: PropsType & CardType) {
  const inCart = props.products.inCart;
  const color = inCart ? 'secondary' : 'primary';
  const disable = inCart;
  const classes = useStyles();

  const onAddItem = () => {
    props.addProducts(props.products.id, props.products.inCart);
    props.setAlert(true);
    setTimeout(() => {
      props.setAlert(false);
    }, 1500);
  };
  return (
    <Card className={classes.root}>
      <CardHeader title={props.products.title} />
      <CardMedia
        className={classes.media}
        image={props.products.urlImg}
        title={props.products.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          We is passionate about technology and driven by innovation. We dream, we
          dare and we strive to create an effortless and joyful digital life for
          everyone.
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justify={'space-between'} alignItems={'center'}>
          <Button
            variant={'contained'}
            onClick={onAddItem}
            color={color}
            disabled={disable}
            startIcon={<AddShoppingCartIcon />}
            size={'large'}
          >
            {inCart ? 'In cart' : 'Buy'}
          </Button>
          <span>{props.products.price} $</span>
        </Grid>
      </CardActions>
    </Card>
  );
});
