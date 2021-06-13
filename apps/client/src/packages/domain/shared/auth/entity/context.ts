import type { UserResult } from 'domain/shared/auth/entity/result';
import type { Dispatch, IContext } from 'domain/shared/store/entity/context';

export type StoreContext = {
  user: UserResult;
}

export interface IAuthContext extends IContext<StoreContext> {
  useUser(): UserResult;

  setUser(dispatch: Dispatch, user: UserResult): void;
}
