import type { IAdminInjector } from 'domain/shared/admin/injector';
import type { CollectionFilter } from 'domain/shared/firestore/entity/base/query';
import type { User } from 'domain/shared/firestore/entity/user';
import type { IFireStoreUserBaseRepository } from 'domain/shared/firestore/repository/base/user';
import { FireStoreBaseRepository } from 'infra/shared/firestore/repository/base/index';
import { inject, singleton } from 'tsyringe';

@singleton()
export class FireStoreUserBaseRepository extends FireStoreBaseRepository<User> implements IFireStoreUserBaseRepository {
  public constructor(
    @inject('IAdminInjector') adminInjector: IAdminInjector,
  ) {
    super(adminInjector);
  }

  public table(): string {
    return 'users';
  }

  public filter(keys: string[]): CollectionFilter<User> | undefined {
    if (keys.length !== 0) {
      throw new Error();
    }

    return undefined;
  }
}
