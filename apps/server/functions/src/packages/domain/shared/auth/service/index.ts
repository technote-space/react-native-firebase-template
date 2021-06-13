import type { User } from 'domain/shared/auth/entity/user';
import type { UserId } from 'domain/shared/auth/value/userId';
import type { AccessToken } from 'domain/shared/github/value/accessToken';

export type UserResult<Flag extends boolean> = Flag extends true ? User : User | null;

export interface IAuthService {
  createToken(uid: UserId): Promise<AccessToken>;

  getUser<Flag extends boolean>(uid: UserId, throwError?: Flag): Promise<UserResult<Flag>>;

  getAccessToken(uid: UserId): Promise<AccessToken>;
}
