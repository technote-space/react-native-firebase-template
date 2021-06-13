import type { CloudFunction } from 'firebase-functions';

export interface IFunctions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(): CloudFunction<any>;
}
