import type { ComponentType } from 'react';
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import type { NavigationState } from '@react-navigation/routers';

export type ScreenProps = {
  navigation: NavigationProp<any, string, NavigationState, { title: string }>;
  route: RouteProp<any, any>;
};

export interface IScreenComponentService {
  getComponent(): ComponentType<ScreenProps>;
}
