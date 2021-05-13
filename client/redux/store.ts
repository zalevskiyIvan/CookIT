import {
  createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from "redux";
import { dishesReducer } from "./reducers/recipesReducer";
import { userReducer } from "./reducers/userReducer";
import thunkMiddleware from "redux-thunk";
import { useMemo } from "react";

const reducers = combineReducers({ dishesReducer, userReducer });

export type RootState = ReturnType<typeof reducers>;

let store;

function initStore(initialState) {
  return createStore(reducers, initialState, applyMiddleware(thunkMiddleware));
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
