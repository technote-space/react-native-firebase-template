import type { ILoadingContext, LoadingProcess, StoreContext } from 'domain/shared/loading/entity/context';
import type { Reducer, Dispatch } from 'domain/shared/store/entity/context';
import { useSelector } from 'domain/shared/store/entity/context';
import { singleton } from 'tsyringe';

@singleton()
export class LoadingContext implements ILoadingContext {
  public getKey(): string {
    return 'loading';
  }

  public getInitialState(): StoreContext {
    return { process: [] };
  }

  public getReducerMapObject(): Record<string, Reducer<StoreContext>> {
    return {
      ADD_LOADING: (store, action) => ({
        ...store,
        process: [...store?.process ?? [], { id: action.id, message: action.message }],
      }),
      DELETE_LOADING: (store, action) => ({
        ...store,
        process: store?.process.filter(process => process.id !== action.id) ?? [],
      }),
      UPDATE_LOADING: (store, action) => ({
        ...store,
        process: store?.process.map(process => process.id === action.id ? {
          ...process,
          ...action.value,
        } : process) ?? [],
      }),
    };
  }

  public persistTargets(): Array<keyof StoreContext> {
    return [];
  }

  public useProcess(): Array<LoadingProcess> {
    return useSelector((state: { loading: StoreContext }) => state.loading.process);
  }

  public add(dispatch: Dispatch, id: string, message?: string) {
    dispatch({ type: 'ADD_LOADING', id, message });
  }

  public delete(dispatch: Dispatch, id: string) {
    dispatch({ type: 'DELETE_LOADING', id });
  }

  public update(dispatch: Dispatch, id: string, value: { message?: string; progress?: number }) {
    dispatch({ type: 'UPDATE_LOADING', id, value });
  }
}
