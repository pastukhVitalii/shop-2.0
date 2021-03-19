import React, { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Login } from '../../../../../Login';
import { Register } from '../../../../../Register';
import {Shop} from '../../../../../Shop';
import { ShoppingCart } from '../../../../../ShoppingCart';

export type PageType = {
  id: number;
  title: string;
  path?: string;
  exact?: boolean;
  page: (props: RouteComponentProps<any>) => ReactNode; // type component
};

export const pages: Array<PageType> = [
  {id: 1, title: 'app', path: '/', exact: true, page: () => <Shop/>},
  {id: 2, title: 'shoppingCart', path: '/shoppingCart', page: () => <ShoppingCart/>},
  {id: 3, title: 'login', path: '/login', page: () => <Login/>},
  {id: 4, title: 'register', path: '/register', page: () => <Register/>},
  {id: 4, title: '404', page: () => <h2>Page 404</h2>},
]