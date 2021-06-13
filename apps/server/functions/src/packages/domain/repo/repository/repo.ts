import type { AccessToken } from 'domain/shared/github/value/accessToken';
import type { Repo, RepoDto } from 'domain/repo/entity/repo';
import type { UserId } from 'domain/shared/auth/value/userId';
import type { RepoId } from 'domain/repo/value/repoId';

export interface IRepoRepository {
  listForUser(token: AccessToken, userId: UserId, page: number): Promise<Repo[]>;

  listSelectedRepos(userId: UserId): Promise<RepoId[]>;

  onSelect(userId: UserId, repo: RepoDto): Promise<void>;

  offSelect(userId: UserId, repo: RepoDto): Promise<void>;
}
