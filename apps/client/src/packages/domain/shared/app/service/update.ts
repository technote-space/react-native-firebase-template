import type { AppStateStatus } from 'react-native';

export interface IUpdateService {
  update(state: AppStateStatus): Promise<void>;
}
