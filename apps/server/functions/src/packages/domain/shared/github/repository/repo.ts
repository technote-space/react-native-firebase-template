import type { AccessToken } from 'domain/shared/github/value/accessToken';
import type { Repo } from 'domain/shared/github/entity/repo';
import type { UserId } from 'domain/shared/auth/value/userId';

export interface IGitHubRepoRepository {
  listForUser(token: AccessToken, userId: UserId, perPage?: number, page?: number): Promise<Repo[]>;
}
