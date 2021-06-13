import type { Repo } from 'domain/shared/firestore/entity/repo';
import type { IFireStoreBaseRepository } from 'domain/shared/firestore/repository/base/index';

export interface IFireStoreRepoBaseRepository extends IFireStoreBaseRepository<Repo> {
}
