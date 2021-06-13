import type { UserId } from 'domain/shared/auth/value/userId';
import type { Repo } from 'domain/shared/firestore/entity/repo';

export interface IFireStoreRepoRepository {
  list(userId: UserId): Promise<Repo[]>;

  add(userId: UserId, repo: Repo): Promise<void>;

  remove(userId: UserId, repo: Repo): Promise<void>;
}
