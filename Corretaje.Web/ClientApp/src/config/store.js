import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

import persistReducer from "redux-persist/lib/persistReducer";

const logger = createLogger({
  collapsed: true,
});

const persistConfig = {
  key: "root",
  storage,
};

const isProduction = process.env.NODE_ENV === "production";
const middleware = isProduction
  ? applyMiddleware(thunk)
  : applyMiddleware(thunk, logger);

const reducer = combineReducers(rootReducer);
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, middleware);
let persistor = persistStore(store);

export default () => ({
  persistor,
  store,
});
