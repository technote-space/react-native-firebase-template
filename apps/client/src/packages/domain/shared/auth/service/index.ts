import type { LogoutCallback } from 'domain/shared/auth/entity/callback';
import type { UserResult } from 'domain/shared/auth/entity/result';

export interface IAuthService {
  useUser(): UserResult;

  useLogout(): LogoutCallback;
}
