import { applyMiddleware, combineReducers, compose, configureStore, createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { shoppingCart, shopReducer, userReducer } from "./reducers";

const reducer = ({
  user: userReducer,
  shoppingCart: shoppingCart,
  shop: shopReducer
})

const store = createStore(combineReducers(reducer), compose(applyMiddleware(thunk), composeWithDevTools()));
// const store = configureStore({ reducer, middleware: [thunk], preloadedState: {} })

export default store;