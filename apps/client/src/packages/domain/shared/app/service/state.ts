import type { AppStateStatus } from 'react-native';

export interface IStateService {
  setup(): Promise<void>;

  getListener(): (state: AppStateStatus) => void;
}
