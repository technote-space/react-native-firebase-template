import type { IFunctions } from 'domain/shared/functions/entity';

export interface IFunctionsInjector {
  list(): Array<string>;

  resolve(name: string): IFunctions;
}
