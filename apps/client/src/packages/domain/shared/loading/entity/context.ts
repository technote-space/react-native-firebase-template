import type { Dispatch, IContext } from 'domain/shared/store/entity/context';

export type LoadingProcess = {
  id: string;
  message?: string;
  progress?: number;
};
export type StoreContext = {
  process: Array<LoadingProcess>;
};

export interface ILoadingContext extends IContext<StoreContext> {
  useProcess(): Array<LoadingProcess>;

  add(dispatch: Dispatch, id: string, message?: string): void;

  delete(dispatch: Dispatch, id: string): void;

  update(dispatch: Dispatch, id: string, value: { message?: string; progress?: number; }): void;
}
