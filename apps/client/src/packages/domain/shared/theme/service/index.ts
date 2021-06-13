import type { Theme as NavigationTheme } from '@react-navigation/native';

export type Theme = ReactNativePaper.Theme & NavigationTheme;

export interface IThemeService {
  getTheme(darkMode: boolean): Theme;
}
