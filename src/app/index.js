import useDarkMode from 'custom-hooks/useDarkMode';
import { PrivateRoute } from 'helpers/PrivateRoute';
import React, { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './index.css';
import MainApp from './pages/MainApp';

const withLazy = comp => props => {
  const Component = lazy(comp);
  return (
    <Suspense fallback={<div className='h-screen w-screen flex items-center justify-center' children={<Loader type='Puff' color='#00BFFF' height={100} width={100} />} />}>
      <Component {...props} />
    </Suspense>
  );
};

function App() {
  useDarkMode();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/test' component={withLazy(() => import('./pages/Test'))} />
        <Route exact path='/login' component={withLazy(() => import('./pages/Login'))} />
        <Route exact path='/signup' component={withLazy(() => import('./pages/Signup'))} />
        <Route exact path='/' render={props => <Redirect {...props} to='/app' />} />
        <PrivateRoute path='/app' component={MainApp} />
        <Route component={withLazy(() => import('./pages/Error404'))} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
