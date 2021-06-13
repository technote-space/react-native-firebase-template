import type { CloudFunction } from 'firebase-functions';
import type { IEntryService } from 'domain/shared/app/service/entry';
import type { IFunctionsFactory } from 'domain/shared/functions/factory';
import { singleton, inject } from 'tsyringe';

@singleton()
export class EntryService implements IEntryService {
  public constructor(
    @inject('IFunctionsFactory') private functionsFactory: IFunctionsFactory,
  ) {
  }

  public handle(name?: string): Record<string, CloudFunction<any>> {
    if (name) {
      return { name: this.functionsFactory.resolve(name).get() };
    }

    return Object.assign({}, ...this.functionsFactory.list().map(name => ({ [name]: this.functionsFactory.resolve(name).get() })));
  }
}
