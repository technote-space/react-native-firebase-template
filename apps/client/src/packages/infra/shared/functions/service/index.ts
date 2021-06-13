import type { IFunctionsService } from 'domain/shared/functions/service';
import type firebase from 'firebase';
import { inject, singleton } from 'tsyringe';

type Functions = firebase.functions.Functions;

@singleton()
export class FunctionsService implements IFunctionsService {
  public constructor(
    @inject('firebase.functions') private functions: Functions,
  ) {
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async call<Result, Data = Record<string, any>>(name: string, data?: Data): Promise<Result> {
    return (await this.functions.httpsCallable(name)(data)).data;
  }
}
