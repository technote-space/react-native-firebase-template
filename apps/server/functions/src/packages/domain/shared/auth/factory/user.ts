import type { User } from 'domain/shared/auth/entity/user';
import type { User as GitHubUser } from 'domain/shared/github/entity/user';
import type { User as StoredUser } from 'domain/shared/firestore/entity/user';

export interface IUserFactory {
  fromGitHubUser(value: GitHubUser): User;

  fromStoredUser(value: StoredUser): User;

  toStoredUser(value: User): StoredUser;
}
