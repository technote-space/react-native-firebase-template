import type { VFC } from 'react';
import type { InitialProps } from 'expo/build/launch/withExpoRoot.types';

export interface IRootService {
  get(): VFC<InitialProps>;
}
