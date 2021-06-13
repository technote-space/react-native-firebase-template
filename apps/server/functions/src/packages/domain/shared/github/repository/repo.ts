import type { UserId } from 'domain/shared/auth/value/userId';
import type { Repo } from 'domain/shared/github/entity/repo';
import type { AccessToken } from 'domain/shared/github/value/accessToken';

export interface IGitHubRepoRepository {
  listForUser(token: AccessToken, userId: UserId, perPage?: number, page?: number): Promise<Repo[]>;
}
