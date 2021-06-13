import type { IFireStoreRepoBaseRepository } from 'domain/shared/firestore/repository/base/repo';
import type { IAdminFactory } from 'domain/shared/admin/factory';
import type { Repo } from 'domain/shared/firestore/entity/repo';
import type { CollectionFilter, CollectionReference } from 'domain/shared/firestore/entity/base/query';
import { FireStoreBaseRepository } from 'infra/shared/firestore/repository/base/index';
import { singleton, inject } from 'tsyringe';

@singleton()
export class FireStoreRepoBaseRepository extends FireStoreBaseRepository<Repo> implements IFireStoreRepoBaseRepository {
  public constructor(
    @inject('IAdminFactory') adminFactory: IAdminFactory,
  ) {
    super(adminFactory);
  }

  public table(): string {
    return 'repos';
  }

  public filter(keys: string[]): CollectionFilter<Repo> | undefined {
    if (keys.length !== 1) {
      throw new Error();
    }

    return ref => ref.doc(keys[0]).collection('repo') as CollectionReference<Repo>;
  }
}
