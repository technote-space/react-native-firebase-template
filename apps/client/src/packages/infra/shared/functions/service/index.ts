import { IFunctionsService } from 'domain/shared/functions/service';
import firebase from 'firebase';
import { singleton, inject } from 'tsyringe';

type Functions = firebase.functions.Functions;

@singleton()
export class FunctionsService implements IFunctionsService {
  public constructor(
    @inject('firebase.functions') private functions: Functions,
  ) {
  }

  public async call<Result, Data = Record<string, any>>(name: string, data?: Data): Promise<Result> {
    return (await this.functions.httpsCallable(name)(data)).data;
  }
}
