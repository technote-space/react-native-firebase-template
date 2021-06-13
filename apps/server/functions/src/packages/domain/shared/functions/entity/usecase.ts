import type { IFunctions } from 'domain/shared/functions/entity/index';
import type { CallableContext, AuthedCallableContext } from 'domain/shared/functions/entity/context';

export interface IUseCase extends IFunctions {
}

export interface ICallUseCase<DataType = never> extends IUseCase {
  callHandler(data: DataType, context: CallableContext): Promise<any>;
}

export interface IAuthedCallUseCase<DataType = never> extends IUseCase {
  callHandler(data: DataType, context: AuthedCallableContext): Promise<any>;
}
