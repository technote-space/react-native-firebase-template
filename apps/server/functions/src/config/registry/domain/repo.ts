import { RepoRepository } from 'infra/repo/repository/repo';
import { GetUserReposUseCase } from 'infra/repo/usecase/getUserRepos';
import { OffSelectUseCase } from 'infra/repo/usecase/offSelect';
import { OnSelectUseCase } from 'infra/repo/usecase/onSelect';
import { container } from 'tsyringe';

container.registerSingleton('IRepoRepository', RepoRepository);
container.registerSingleton('IGetUserReposUseCase', GetUserReposUseCase);
container.registerSingleton('IOnSelectUseCase', OnSelectUseCase);
container.registerSingleton('IOffSelectUseCase', OffSelectUseCase);
