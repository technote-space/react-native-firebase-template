import type { RepoDto } from 'domain/repo/entity/repo';
import type { IAuthedCallUseCase } from 'domain/shared/functions/entity/usecase';

export type DataType = { repo: RepoDto };

export interface IOffSelectUseCase extends IAuthedCallUseCase<DataType> {
}
