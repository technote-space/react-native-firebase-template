import type { IFireStoreBaseRepository } from 'domain/shared/firestore/repository/base/index';
import type { Repo } from 'domain/shared/firestore/entity/repo';

export interface IFireStoreRepoBaseRepository extends IFireStoreBaseRepository<Repo> {
}
