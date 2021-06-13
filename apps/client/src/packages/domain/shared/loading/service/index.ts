import type { LoadingProcess } from 'domain/shared/loading/entity/context';

export interface ILoadingService {
  useLoading<T>(): (callback: () => Promise<T>, message?: string, identifier?: string) => Promise<T>;

  isProcessRunning(identifier: string, process: Array<LoadingProcess>): boolean;
}
