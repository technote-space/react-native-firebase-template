/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropsWithChildren, VFC } from 'react';

export type { AnyAction, Reducer } from 'redux';
export { createStore, combineReducers, applyMiddleware } from 'redux';
export { Provider } from 'react-redux';
export { PersistGate } from 'redux-persist/integration/react';
export { persistReducer, persistStore } from 'redux-persist';
export { createLogger } from 'redux-logger';

export interface IStoreService {
  getStoreProvider(): VFC<PropsWithChildren<{}>>;
}
