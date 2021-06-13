/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IContext } from 'domain/shared/store/entity/context';
import type { AnyAction, IStoreFactory, Reducer } from 'domain/shared/store/factory';
import type { PropsWithChildren, VFC } from 'react';
import { applyMiddleware, combineReducers, createLogger, createStore, PersistGate, persistReducer, persistStore, Provider } from 'domain/shared/store/factory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { memo } from 'react';
import { container, inject, singleton } from 'tsyringe';

@singleton()
export class StoreFactory<StoreContext extends Record<string, any>> implements IStoreFactory {
  private readonly __provider: VFC<PropsWithChildren<{}>>;

  public constructor(
    @inject('contexts') contexts: string[],
  ) {
    const _contexts = contexts.map(context => container.resolve<IContext<any>>(context));
    const store = createStore(this.getReducer(_contexts), this.getInitialState(_contexts), applyMiddleware(createLogger()));
    const persistor = persistStore(store);
    this.__provider = memo(({ children }: PropsWithChildren<any>) => {
      return <Provider store={store}>
        <PersistGate persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>;
    });
  }

  protected getInitialState(contexts: IContext<any>[]) {
    return Object.assign({}, ...contexts.map(context => ({ [context.getKey()]: context.getInitialState() })));
  }

  protected getReducer(contexts: IContext<any>[]): Reducer {
    return combineReducers(Object.assign({}, ...contexts.map(context => {
      const mapObject = context.getReducerMapObject();
      const reducer = (state: StoreContext, action: AnyAction) => {
        if (action.type in mapObject) {
          return mapObject[action.type](state, action);
        }

        return state ?? null;
      };

      const targets = context.persistTargets() as Array<string>;
      if (targets.length) {
        return {
          [context.getKey()]: persistReducer({
            key: context.getKey(),
            storage: AsyncStorage,
            whitelist: targets,
          }, reducer),
        };
      }

      return { [context.getKey()]: reducer };
    })));
  }

  public getStoreProvider(): React.VFC<React.PropsWithChildren<{}>> {
    return this.__provider;
  }
}
