import type { ILoadingContext, LoadingProcess } from 'domain/shared/loading/entity/context';
import type { ILoadingService } from 'domain/shared/loading/service';
import { useDispatch } from 'domain/shared/store/entity/context';
import { useCallback } from 'react';
import { inject, singleton } from 'tsyringe';

@singleton()
export class LoadingService implements ILoadingService {
  public constructor(
    @inject('ILoadingContext') private loadingContext: ILoadingContext,
  ) {
  }

  private static generateRandomString(): string {
    const string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from(Array(32)).map(() => string[Math.floor(Math.random() * string.length)]).join('');
  }

  public useLoading<T>(): (callback: () => Promise<T>, message?: string, identifier?: string) => Promise<T> {
    const dispatch = useDispatch();

    return useCallback(async(callback, message, identifier) => {
      const id = identifier ?? LoadingService.generateRandomString();
      try {
        this.loadingContext.add(dispatch, id, message);
        return await callback();
      } finally {
        this.loadingContext.delete(dispatch, id);
      }
    }, []);
  }

  public isProcessRunning(identifier: string, process: Array<LoadingProcess>): boolean {
    return !!process.find(process => process.id === identifier);
  }
}
