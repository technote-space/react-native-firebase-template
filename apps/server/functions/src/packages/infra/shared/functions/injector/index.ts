import type { IFunctions } from 'domain/shared/functions/entity';
import type { IFunctionsInjector } from 'domain/shared/functions/injector';
import { container, inject, singleton } from 'tsyringe';

@singleton()
export class FunctionsInjector implements IFunctionsInjector {
  public constructor(
    @inject('functions') private functions: Record<string, string>,
  ) {
  }

  public list(): Array<string> {
    return Object.keys(this.functions);
  }

  public resolve(name: string): IFunctions | never {
    if (name in this.functions) {
      return container.resolve(this.functions[name]);
    }

    throw new Error(`functions [${name}] not found`);
  }
}
