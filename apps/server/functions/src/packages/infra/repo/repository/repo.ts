import type { IRepoRepository } from 'domain/repo/repository/repo';
import type { IGitHubRepoRepository } from 'domain/shared/github/repository/repo';
import type { IFireStoreRepoRepository } from 'domain/shared/firestore/repository/repo';
import type { AccessToken } from 'domain/shared/github/value/accessToken';
import type { Repo, RepoDto } from 'domain/repo/entity/repo';
import type { UserId } from 'domain/shared/auth/value/userId';
import { RepoId } from 'domain/repo/value/repoId';
import { singleton, inject } from 'tsyringe';

@singleton()
export class RepoRepository implements IRepoRepository {
  public constructor(
    @inject('IGitHubRepoRepository') private gitHubRepoRepository: IGitHubRepoRepository,
    @inject('IFireStoreRepoRepository') private fireStoreRepoRepository: IFireStoreRepoRepository,
  ) {
  }

  public async listForUser(token: AccessToken, userId: UserId, page: number): Promise<Repo[]> {
    const enabled: Record<number, true> = Object.assign({}, ...(await this.listSelectedRepos(userId)).map(repoId => ({ [repoId.value()]: true })));
    return (await this.gitHubRepoRepository.listForUser(token, userId, 50, page)).map(repo => ({
      ...repo,
      isEnabled: repo.id in enabled,
    }));
  }

  public async listSelectedRepos(userId: UserId): Promise<RepoId[]> {
    return (await this.fireStoreRepoRepository.list(userId)).map(repo => RepoId.create(repo.id));
  }

  public async onSelect(userId: UserId, repo: RepoDto): Promise<void> {
    return this.fireStoreRepoRepository.add(userId, repo);
  }

  public offSelect(userId: UserId, repo: RepoDto): Promise<void> {
    return this.fireStoreRepoRepository.remove(userId, repo);
  }
}
