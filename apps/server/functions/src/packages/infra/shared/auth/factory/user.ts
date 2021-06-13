import type { User } from 'domain/shared/auth/entity/user';
import type { IUserFactory } from 'domain/shared/auth/factory/user';
import type { User as StoredUser } from 'domain/shared/firestore/entity/user';
import type { User as GitHubUser } from 'domain/shared/github/entity/user';
import { Avatar } from 'domain/shared/auth/value/avatar';
import { UserId } from 'domain/shared/auth/value/userId';
import { UserName } from 'domain/shared/auth/value/userName';
import { UserNumber } from 'domain/shared/auth/value/userNumber';
import { AccessToken } from 'domain/shared/github/value/accessToken';

export class UserFactory implements IUserFactory {
  public fromGitHubUser(value: GitHubUser): User {
    return {
      login: UserId.create(value.login),
      id: UserNumber.create(value.id),
      avatarUrl: Avatar.create(value.avatarUrl),
      name: UserName.create(value.name),
      accessToken: AccessToken.create(value.accessToken),
    };
  }

  public fromStoredUser(value: StoredUser): User {
    return {
      login: UserId.create(value.login),
      id: UserNumber.create(value.id),
      avatarUrl: Avatar.create(value.avatarUrl),
      name: UserName.create(value.name),
      accessToken: AccessToken.create(value.accessToken),
    };
  }

  public toStoredUser(value: User): StoredUser {
    return {
      login: value.login.value(),
      id: value.id.value(),
      avatarUrl: value.avatarUrl.value(),
      name: value.name.value(),
      accessToken: value.accessToken.value(),
    };
  }
}
