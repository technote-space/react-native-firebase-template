import type { UserId } from 'domain/shared/auth/value/userId';
import type { Repo } from 'domain/shared/firestore/entity/repo';
import type { IFireStoreRepoBaseRepository } from 'domain/shared/firestore/repository/base/repo';
import type { IFireStoreRepoRepository } from 'domain/shared/firestore/repository/repo';
import { inject, singleton } from 'tsyringe';

@singleton()
export class FireStoreRepoRepository implements IFireStoreRepoRepository {
  public constructor(
    @inject('IFireStoreRepoBaseRepository') private fireStoreRepoBaseRepository: IFireStoreRepoBaseRepository,
  ) {
  }

  public async list(userId: UserId): Promise<Repo[]> {
    return (await this.fireStoreRepoBaseRepository.list([userId.value()])).data();
  }

  public add(userId: UserId, repo: Repo): Promise<void> {
    return this.fireStoreRepoBaseRepository.create([userId.value()], String(repo.id), repo);
  }

  public remove(userId: UserId, repo: Repo): Promise<void> {
    return this.fireStoreRepoBaseRepository.delete([userId.value()], String(repo.id));
  }
}
