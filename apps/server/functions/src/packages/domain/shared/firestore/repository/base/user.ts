import type { IFireStoreBaseRepository } from 'domain/shared/firestore/repository/base/index';
import type { User } from 'domain/shared/firestore/entity/user';

export interface IFireStoreUserBaseRepository extends IFireStoreBaseRepository<User> {
}
