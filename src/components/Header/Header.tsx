import { AppBar, Button, Grid, IconButton } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { initializeUserTC, logoutTC } from '../../BLL-redux/auth-reducer';
import { AppRootStateType } from '../../BLL-redux/store';
import { UserType } from '../../scenes/Login';
import { useStyles } from './index';

type PropsType = {
  totalPrice: number;
};

export const Header = React.memo(function (props: PropsType) {
  const classes = useStyles();
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn,
  );
  
  const user = useSelector<AppRootStateType, UserType>(
    (state) => state.auth.user,
    );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUserTC());
  }, [dispatch, isLoggedIn]);

  const logOutCallback = useCallback(() => {
    dispatch(logoutTC());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <AppBar color="primary" className={classes.header}>
        <Grid container direction="row" justify="space-between">
          <div>
            <NavLink to={'/'}>
              <IconButton className={classes.btn_header} aria-label="home">
                <HomeIcon />
              </IconButton>
            </NavLink>
            {isLoggedIn ? (
              <>
                <Button
                  color="inherit"
                  className={classes.btn_header}
                  aria-labelledby="log out"
                  onClick={logOutCallback}
                >
                  Log out
                </Button>{' '}
                <span>Hello {user.firstName}</span>
              </>
            ) : (
              <NavLink to={'login'} aria-label="log in">
                <Button color="inherit" className={classes.btn_header}>
                  Log in
                </Button>
              </NavLink>
            )}
          </div>
          <div>
            {props.totalPrice ? <span>{props.totalPrice} $</span> : ''}
            <NavLink to={'/shoppingCart'}>
              <IconButton className={classes.btn_header} aria-label="shopping cart">
                <ShoppingCart />
              </IconButton>
            </NavLink>
          </div>
        </Grid>
      </AppBar>
    </div>
  );
});