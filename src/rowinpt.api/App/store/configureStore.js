import {createStore, compose, applyMiddleware} from "redux";
import ReduxImmutableStateInvariant from "redux-immutable-state-invariant";
import Thunk from "redux-thunk";
import RootReducer from "../reducers";

function configureStoreProd(initialState) {
  const middlewares = [
    Thunk
  ];

  return createStore(RootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
}

function configureStoreDev(initialState) {
  const middlewares = [
    ReduxImmutableStateInvariant(),
    Thunk
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(RootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  );

  return store;
}

const configureStore = process.env.NODE_ENV === "production" ? configureStoreProd : configureStoreDev;

export default configureStore;