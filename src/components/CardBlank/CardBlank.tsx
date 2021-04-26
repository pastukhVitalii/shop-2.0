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
import React, { useContext } from 'react';

import { ProductType } from '../../BLL-redux/productsReducer';
import { Context, setMessageAC } from '../../context/context';
import { useStyles } from './index';

export type PropsType = {
  products: ProductType;
  addProducts: (id: string, inCart: boolean) => void;
};
export type CardType = {
  onAddItem?: (id: string, inCart: boolean) => void;
  onDeleteItem?: () => void;
};

// const BUTTON_STYLES = {
//   PRIMARY: 'primary',
// }

export const CardBlank = React.memo(function (props: PropsType & CardType) {
  const inCart = props.products.inCart;
  const color = inCart ? 'secondary' : 'primary'; // comment: all strings should go in constants
  const disable = inCart; // comment: do we really need two vars with the same value? 
  const classes = useStyles();

  const { contextDispatch } = useContext<any>(Context);

  const onAddItem = () => {
    props.addProducts(props.products.id, props.products.inCart);
    contextDispatch(setMessageAC(true));
    setTimeout(() => {
      contextDispatch(setMessageAC(false));
    }, 1500); // comment: timeout should be in Message component
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
        <Grid container justify="space-between" alignItems="center">
          <Button
            variant="contained"
            onClick={onAddItem}
            color={color}
            disabled={disable}
            startIcon={<AddShoppingCartIcon />}
            size="large"
          >
            {/* comment: strings to constants */}
            {inCart ? 'In cart' : 'Buy'}
          </Button>
          <span>{props.products.price} $</span>
        </Grid>
      </CardActions>
    </Card>
  );
});
