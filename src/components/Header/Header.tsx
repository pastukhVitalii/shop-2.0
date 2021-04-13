import { Button, Grid, IconButton } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { ShoppingCart } from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logoutTC } from '../../BLL-redux/auth-reducer';
import { AppRootStateType } from '../../BLL-redux/store';
import { initializeUserTC } from '../../BLL-redux/userReducer';
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

  const user = useSelector<AppRootStateType, UserType>((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUserTC());
  }, [dispatch, isLoggedIn]);

  const logOutCallback = useCallback(() => {
    dispatch(logoutTC());
  }, [dispatch]);

  return (
    <div>
      <BottomNavigation color="primary" className={classes.root} showLabels={false}>
        <Grid container direction="row" justify="space-between">
          <div>
            <NavLink to={'/'}>
              <IconButton className={classes.btn_header}>
                <HomeIcon />
              </IconButton>
            </NavLink>
            {isLoggedIn ? (
              <>
                <Button
                  color="inherit"
                  className={classes.btn_header}
                  onClick={logOutCallback}
                >
                  Log out
                </Button>{' '}
                <span>Hello {user.firstName}</span>
              </>
            ) : (
              <NavLink to={'login'}>
                <Button
                  color="inherit"
                  className={classes.btn_header}
                  onClick={logOutCallback}
                >
                  Log in
                </Button>
              </NavLink>
            )}
          </div>
          <div>
            {props.totalPrice? <span>{props.totalPrice} $</span> : ''}
            <NavLink to={'/shoppingCart'}>
              <IconButton className={classes.btn_header}>
                <ShoppingCart />
              </IconButton>
            </NavLink>
          </div>
        </Grid>
      </BottomNavigation>
    </div>
  );
});
