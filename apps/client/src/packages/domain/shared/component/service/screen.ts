import type { NavigationProp, RouteProp } from '@react-navigation/native';
import type { NavigationState } from '@react-navigation/routers';
import type { ComponentType } from 'react';

export type ScreenProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any, string, NavigationState, { title: string }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route: RouteProp<any, any>;
};

export interface IScreenComponentService {
  getComponent(): ComponentType<ScreenProps>;
}
