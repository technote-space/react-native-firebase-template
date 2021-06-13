import type { User } from 'domain/shared/auth/entity/user';
import type { UserId } from 'domain/shared/auth/value/userId';

export interface IFireStoreUserRepository {
  find(uid: UserId): Promise<User | null>;

  create(user: User): Promise<void>;
}
