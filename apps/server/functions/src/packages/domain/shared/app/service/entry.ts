import type { CloudFunction } from 'firebase-functions';

export interface IEntryService {
  handle(name?: string): Record<string, CloudFunction<any>>;
}
