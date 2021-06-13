import type { AuthedCallableContext, CallableContext } from 'domain/shared/functions/entity/context';
import type { IFunctions } from 'domain/shared/functions/entity/index';

export interface IUseCase extends IFunctions {
}

export interface ICallUseCase<DataType = never> extends IUseCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callHandler(data: DataType, context: CallableContext): Promise<any>;
}

export interface IAuthedCallUseCase<DataType = never> extends IUseCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callHandler(data: DataType, context: AuthedCallableContext): Promise<any>;
}
