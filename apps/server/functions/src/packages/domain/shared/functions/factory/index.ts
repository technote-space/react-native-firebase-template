import type { IFunctions } from 'domain/shared/functions/entity';

export interface IFunctionsFactory {
  list(): Array<string>;

  resolve(name: string): IFunctions;
}
