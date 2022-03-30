import { createStore, applyMiddleware, combineReducers } from "redux";

//redux persistant
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2
};

const logger = createLogger({
  collapsed: true
});

const isProduction = process.env.NODE_ENV === "production";
const middleware = isProduction
  ? applyMiddleware(thunk)
  : applyMiddleware(thunk, logger);

const reducer = combineReducers(rootReducer);
const pReducer = persistReducer(persistConfig, reducer);

export const store = createStore(pReducer, middleware);
export const persistor = persistStore(store);
