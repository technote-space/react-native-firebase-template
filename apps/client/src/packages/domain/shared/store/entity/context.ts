/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dispatch, Reducer } from 'redux';
import type { PersistConfig } from 'redux-persist';

export type { Dispatch, Reducer, PersistConfig };
export { useDispatch, useSelector } from 'react-redux';

export interface IContext<StoreContext extends Record<string, any>> {
  getKey(): string;

  getInitialState(): StoreContext;

  getReducerMapObject(): Record<string, Reducer<StoreContext>>;

  persistTargets(): Array<keyof StoreContext>;
}
