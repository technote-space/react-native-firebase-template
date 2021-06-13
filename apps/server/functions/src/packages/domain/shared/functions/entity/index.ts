import type { CloudFunction } from 'firebase-functions';

export interface IFunctions {
  get(): CloudFunction<any>;
}
