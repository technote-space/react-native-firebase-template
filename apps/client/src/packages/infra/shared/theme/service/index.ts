import type { IThemeService, Theme } from 'domain/shared/theme/service';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { singleton } from 'tsyringe';

@singleton()
export class ThemeService implements IThemeService {
  private readonly __lightTheme: Theme;
  private readonly __darkTheme: Theme;

  public constructor() {
    this.__lightTheme = {
      ...PaperDefaultTheme,
      ...NavigationDefaultTheme,
      colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
      },
    };
    this.__darkTheme = {
      ...PaperDarkTheme,
      ...NavigationDarkTheme,
      colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
      },
    };
  }

  getTheme(darkMode: boolean): Theme {
    return darkMode ? this.__darkTheme : this.__lightTheme;
  }
}
