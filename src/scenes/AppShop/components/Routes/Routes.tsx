import React from 'react';
import { Route, Switch } from 'react-router';

import { PageType } from './components/Pages';
import { pages } from './components/Pages';

const mappedRoutes = pages.map((p: PageType) => (
  <Route
    key={'route-' + p.title + p.id}
    path={p.path}
    exact={p.exact}
    render={p.page}
  />
));

export const Routes = () => {
  return <Switch>{mappedRoutes}</Switch>;
};
