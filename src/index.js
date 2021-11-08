import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import App from './app';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
