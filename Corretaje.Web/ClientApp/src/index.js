import "bootstrap/dist/css/bootstrap.css";
import "./css/style-propins.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./config/store";
import Container from "./App";
import registerServiceWorker from "./registerServiceWorker";

const { persistor, store } = configureStore();

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <LastLocationProvider>
          <div>
            <Container />
          </div>
        </LastLocationProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  rootElement
);

registerServiceWorker();
