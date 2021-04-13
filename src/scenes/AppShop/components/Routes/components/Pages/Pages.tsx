import { CircularProgress, Grid } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Shop } from '../../../../../Shop';

const ShoppingCart = React.lazy(() => import('../../../../../ShoppingCart'));
const Register = React.lazy(() => import('../../../../../Register'));
const Login = React.lazy(() => import('../../../../../Login'));

export type PageType = {
  id: number;
  title: string;
  path?: string;
  exact?: boolean;
  page: (props: RouteComponentProps<any>) => ReactNode; // type component
};

export const pages: Array<PageType> = [
  { id: 1, title: 'app', path: '/', exact: true, page: () => <Shop /> },
  {
    id: 2,
    title: 'shoppingCart',
    path: '/shoppingCart',
    page: () => {
      return (
        <React.Suspense
          fallback={
            <Grid container justify="center">
              <CircularProgress />
            </Grid>
          }
        >
          <ShoppingCart />
        </React.Suspense>
      );
    },
  },
  {
    id: 3,
    title: 'login',
    path: '/login',
    page: () => {
      return (
        <React.Suspense
          fallback={
            <Grid container justify="center">
              <CircularProgress />
            </Grid>
          }
        >
          <Login />
        </React.Suspense>
      );
    },
  },
  {
    id: 4,
    title: 'register',
    path: '/register',
    page: () => {
      return (
        <React.Suspense
          fallback={
            <Grid container justify="center">
              <CircularProgress />
            </Grid>
          }
        >
          <Register />
        </React.Suspense>
      );
    },
  },
  { id: 4, title: '404', page: () => <h2>Page 404</h2> },
];
