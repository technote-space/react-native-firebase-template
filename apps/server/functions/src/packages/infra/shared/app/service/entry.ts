import type { IEntryService } from 'domain/shared/app/service/entry';
import type { IFunctionsFactory } from 'domain/shared/functions/factory';
import type { CloudFunction } from 'firebase-functions';
import { inject, singleton } from 'tsyringe';

@singleton()
export class EntryService implements IEntryService {
  public constructor(
    @inject('IFunctionsFactory') private functionsFactory: IFunctionsFactory,
  ) {
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handle(name?: string): Record<string, CloudFunction<any>> {
    if (name) {
      return { name: this.functionsFactory.resolve(name).get() };
    }

    return Object.assign({}, ...this.functionsFactory.list().map(name => ({ [name]: this.functionsFactory.resolve(name).get() })));
  }
}
