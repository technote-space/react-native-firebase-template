import type { User } from 'domain/shared/github/entity/user';
import type { AccessToken } from 'domain/shared/github/value/accessToken';

export interface IGitHubUserRepository {
  find(token: AccessToken): Promise<User>;
}
