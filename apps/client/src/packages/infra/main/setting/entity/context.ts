import type { ISettingContext, StoreContext } from 'domain/main/setting/entity/context';
import type { Reducer, Dispatch } from 'domain/shared/store/entity/context';
import { Appearance } from 'react-native';
import { useSelector } from 'domain/shared/store/entity/context';
import { singleton } from 'tsyringe';

@singleton()
export class SettingContext implements ISettingContext {
  public getKey(): string {
    return 'setting';
  }

  public getInitialState(): StoreContext {
    return { theme: { darkMode: Appearance.getColorScheme() === 'dark' } };
  }

  public getReducerMapObject(): Record<string, Reducer<StoreContext>> {
    return {
      SWITCH_DARK_MODE: (store) => ({
        ...store,
        theme: {
          darkMode: !store?.theme.darkMode,
        },
      }),
    };
  }

  public persistTargets(): Array<keyof StoreContext> {
    return ['theme'];
  }

  public useDarkMode(): boolean {
    return useSelector((state: { setting: StoreContext }) => state.setting.theme.darkMode);
  }

  public switchDarkMode(dispatch: Dispatch) {
    dispatch({ type: 'SWITCH_DARK_MODE' });
  }
}
