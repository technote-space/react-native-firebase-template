import type { IContext, Dispatch } from 'domain/shared/store/entity/context';

export type StoreContext = {
  theme: { darkMode: boolean }
};

export interface ISettingContext extends IContext<StoreContext> {
  useDarkMode(): boolean;

  switchDarkMode(dispatch: Dispatch): void;
}
