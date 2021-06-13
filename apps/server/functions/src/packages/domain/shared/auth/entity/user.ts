import type { UserId } from 'domain/shared/auth/value/userId';
import type { AccessToken } from 'domain/shared/github/value/accessToken';
import type { UserNumber } from 'domain/shared/auth/value/userNumber';
import type { Avatar } from 'domain/shared/auth/value/avatar';
import type { UserName } from 'domain/shared/auth/value/userName';

export type User = {
  login: UserId;
  id: UserNumber;
  avatarUrl: Avatar;
  name: UserName;
  accessToken: AccessToken;
};
