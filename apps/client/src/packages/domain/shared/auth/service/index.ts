import type { UserResult } from 'domain/shared/auth/entity/result';
import type { LogoutCallback } from 'domain/shared/auth/entity/callback';

export interface IAuthService {
  useUser(): UserResult;

  useLogout(): LogoutCallback;
}
