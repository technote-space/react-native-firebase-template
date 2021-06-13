import { container } from 'tsyringe';
import { RepoRepository } from 'infra/repo/repository/repo';
import { GetUserReposUseCase } from 'infra/repo/usecase/getUserRepos';
import { OnSelectUseCase } from 'infra/repo/usecase/onSelect';
import { OffSelectUseCase } from 'infra/repo/usecase/offSelect';

container.registerSingleton('IRepoRepository', RepoRepository);
container.registerSingleton('IGetUserReposUseCase', GetUserReposUseCase);
container.registerSingleton('IOnSelectUseCase', OnSelectUseCase);
container.registerSingleton('IOffSelectUseCase', OffSelectUseCase);
