import type { IEntryService } from 'domain/shared/app/service/entry';
import type { IFunctionsInjector } from 'domain/shared/functions/injector';
import type { CloudFunction } from 'firebase-functions';
import { inject, singleton } from 'tsyringe';

@singleton()
export class EntryService implements IEntryService {
  public constructor(
    @inject('IFunctionsInjector') private functionsInjector: IFunctionsInjector,
  ) {
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handle(name?: string): Record<string, CloudFunction<any>> {
    if (name) {
      return { name: this.functionsInjector.resolve(name).get() };
    }

    return Object.assign({}, ...this.functionsInjector.list().map(name => ({ [name]: this.functionsInjector.resolve(name).get() })));
  }
}
