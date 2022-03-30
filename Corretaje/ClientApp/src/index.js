/** @format */

import './index.css';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/shards-dashboards.1.1.0.min.css';

import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { history } from '../src/utils/history';
import { persistor, store } from './config/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import App from './App';

import registerServiceWorker from './serviceWorker';

//const appStore = store().store;

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  rootElement
);

registerServiceWorker();
