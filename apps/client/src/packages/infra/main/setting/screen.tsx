import type { ISettingScreen } from 'domain/main/setting/screen';
import type { ISettingContext } from 'domain/main/setting/entity/context';
import type { SettingsData } from 'react-native-settings-screen';
import React, { memo, useCallback, useMemo } from 'react';
import { Switch, useTheme } from 'react-native-paper';
import { SettingsScreen } from 'react-native-settings-screen';
import { useDispatch } from 'domain/shared/store/entity/context';
import { inject, singleton } from 'tsyringe';

@singleton()
export class SettingScreen implements ISettingScreen {
  public constructor(
    @inject('ISettingContext') private settingContext: ISettingContext,
  ) {
  }

  public getComponent() {
    const component = memo(() => {
      const { colors } = useTheme();
      const darkMode = this.settingContext.useDarkMode();
      const dispatch = useDispatch();
      const onToggleDarkMode = useCallback(() => {
        this.settingContext.switchDarkMode(dispatch);
      }, []);

      const settings: SettingsData = useMemo(() => [
        {
          type: 'SECTION',
          rows: [
            {
              title: 'ダークモード',
              renderAccessory: () => <Switch
                value={darkMode}
                onValueChange={onToggleDarkMode}
              />,
            },
          ],
        },
      ], [darkMode]);

      return <SettingsScreen
        data={settings}
        style={{ backgroundColor: colors.background }}
      />;
    });
    component.displayName = 'SettingScreen';

    return component;
  }

}
