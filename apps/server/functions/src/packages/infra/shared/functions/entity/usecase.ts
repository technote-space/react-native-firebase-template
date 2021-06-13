import type { IUseCase, ICallUseCase, IAuthedCallUseCase } from 'domain/shared/functions/entity/usecase';
import { CallableContext, AuthedCallableContext } from 'domain/shared/functions/entity/context';
import type { CloudFunction, FunctionBuilder } from 'firebase-functions';
import * as functions from 'firebase-functions';

const __functions = functions.region('asia-northeast1');

export abstract class UseCase implements IUseCase {
  public abstract get(): CloudFunction<any>;

  protected functions(): FunctionBuilder {
    return __functions;
  }
}

export abstract class CallUseCase<DataType = never> extends UseCase implements ICallUseCase<DataType> {
  public abstract callHandler(data: DataType, context: CallableContext): Promise<any>;

  public get(): CloudFunction<any> {
    return this.functions().https.onCall(async (data: any, context) => {
      return this.callHandler(data, context);
    });
  }
}

export abstract class AuthedCallUseCase<DataType = never> extends UseCase implements IAuthedCallUseCase<DataType> {
  public abstract callHandler(data: DataType, context: AuthedCallableContext): Promise<any>;

  public get(): CloudFunction<any> {
    return this.functions().https.onCall(async (data: any, context) => {
      if (!context.auth) {
        throw new Error();
      }

      return this.callHandler(data, context as AuthedCallableContext);
    });
  }
}
