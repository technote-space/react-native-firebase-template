import type { IFunctionsFactory } from 'domain/shared/functions/factory';
import type { IFunctions } from 'domain/shared/functions/entity';
import { singleton, inject, container } from 'tsyringe';

@singleton()
export class FunctionsFactory implements IFunctionsFactory {
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
