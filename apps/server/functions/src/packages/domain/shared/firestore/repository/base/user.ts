import type { User } from 'domain/shared/firestore/entity/user';
import type { IFireStoreBaseRepository } from 'domain/shared/firestore/repository/base/index';

export interface IFireStoreUserBaseRepository extends IFireStoreBaseRepository<User> {
}
