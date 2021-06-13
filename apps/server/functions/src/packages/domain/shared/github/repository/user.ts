import type { AccessToken } from 'domain/shared/github/value/accessToken';
import type { User } from 'domain/shared/github/entity/user';

export interface IGitHubUserRepository {
  find(token: AccessToken): Promise<User>;
}
