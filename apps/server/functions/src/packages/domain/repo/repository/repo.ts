import type { Repo, RepoDto } from 'domain/repo/entity/repo';
import type { RepoId } from 'domain/repo/value/repoId';
import type { UserId } from 'domain/shared/auth/value/userId';
import type { AccessToken } from 'domain/shared/github/value/accessToken';

export interface IRepoRepository {
  listForUser(token: AccessToken, userId: UserId, page: number): Promise<Repo[]>;

  listSelectedRepos(userId: UserId): Promise<RepoId[]>;

  onSelect(userId: UserId, repo: RepoDto): Promise<void>;

  offSelect(userId: UserId, repo: RepoDto): Promise<void>;
}
