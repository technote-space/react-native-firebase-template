import type { ICallUseCase } from 'domain/shared/functions/entity/usecase';

export type DataType = { code: string; state: string };

export interface ILoginUseCase extends ICallUseCase<DataType> {
}
