import type { InitialProps } from 'expo/build/launch/withExpoRoot.types';
import type { VFC } from 'react';

export interface IRootService {
  get(): VFC<InitialProps>;
}
