import type { ReactElement } from 'react';
import type { User } from 'domain/shared/auth/entity/user';

export type UserResult = {
  user: User;
  isLoading: false;
  isLogin: false;
  isLoggedIn: true;
} | {
  isLoading: false;
  isLogin: false;
  isLoggedIn: false;
  isAuthorized: boolean;
} | {
  isLoading: false;
  isLogin: true;
  isLoggedIn: false;
  component: ReactElement
} | {
  isLoading: true;
  isLogin: false;
  isLoggedIn: false;
}
