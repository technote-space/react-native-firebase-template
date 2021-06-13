import type { IAuthedCallUseCase } from 'domain/shared/functions/entity/usecase';

export type DataType = { page: number };

export interface IGetUserReposUseCase extends IAuthedCallUseCase<DataType> {
}
