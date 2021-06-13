import type { CloudFunction } from 'firebase-functions';

export interface IEntryService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handle(name?: string): Record<string, CloudFunction<any>>;
}
