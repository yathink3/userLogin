import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import encryptStorage from './encryptStorage';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = encryptStorage.getItem('user-token');
  return <Route {...rest} render={props => (token ? <Component {...props} /> : <Redirect {...props} to='/login' />)} />;
};
