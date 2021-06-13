import type { MaterialBottomTabNavigationOptions } from '@react-navigation/material-bottom-tabs';
import type { StackNavigationOptions } from '@react-navigation/stack';
import type { IconName } from 'root/types';
import type { StackNavigationConfig } from '@react-navigation/stack/src/types';
import type { MaterialBottomTabNavigationConfig } from '@react-navigation/material-bottom-tabs/src/types';

export type NavigatorItem = {
  name: string;
  screen: string;
  options?: MaterialBottomTabNavigationOptions | StackNavigationOptions;
  label?: string;
  icon?: IconName;
} | {
  name: string;
  type: 'bottom';
  items: Array<NavigatorItem>;
  initialRouteName?: string;
  options?: MaterialBottomTabNavigationOptions;
  config?: MaterialBottomTabNavigationConfig;
} | {
  name: string;
  type: 'stack';
  items: Array<NavigatorItem>;
  initialRouteName?: string;
  options?: StackNavigationOptions;
  label?: string;
  icon?: IconName;
  config?: StackNavigationConfig;
}

export type NavigatorSetting = {
  items: Array<NavigatorItem>;
  config?: StackNavigationConfig;
}
