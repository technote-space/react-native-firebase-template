import type { IAuthedCallUseCase } from 'domain/shared/functions/entity/usecase';
import type { RepoDto } from 'domain/repo/entity/repo';

export type DataType = { repo: RepoDto };

export interface IOffSelectUseCase extends IAuthedCallUseCase<DataType> {
}
