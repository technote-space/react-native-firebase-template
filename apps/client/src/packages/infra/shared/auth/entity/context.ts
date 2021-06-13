import type { IAuthContext, StoreContext } from 'domain/shared/auth/entity/context';
import type { UserResult } from 'domain/shared/auth/entity/result';
import type { Reducer, Dispatch } from 'domain/shared/store/entity/context';
import { useSelector } from 'domain/shared/store/entity/context';
import { singleton } from 'tsyringe';

@singleton()
export class AuthContext implements IAuthContext {
  public getKey(): string {
    return 'auth';
  }

  public getInitialState(): StoreContext {
    return { user: { isLoading: true, isLoggedIn: false, isLogin: false } };
  }

  public getReducerMapObject(): Record<string, Reducer<StoreContext>> {
    return {
      SET_USER: (store, action) => ({ ...store, user: action.user }),
    };
  }

  public persistTargets(): Array<keyof StoreContext> {
    return [];
  }

  public useUser(): UserResult {
    return useSelector((state: { auth: StoreContext }) => state.auth.user);
  }

  public setUser(dispatch: Dispatch, user: UserResult) {
    dispatch({ type: 'SET_USER', user });
  }
}
