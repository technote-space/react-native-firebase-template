import type { User } from 'domain/shared/auth/entity/user';
import type { IUserFactory } from 'domain/shared/auth/factory/user';
import type { UserId } from 'domain/shared/auth/value/userId';
import type { IFireStoreUserBaseRepository } from 'domain/shared/firestore/repository/base/user';
import type { IFireStoreUserRepository } from 'domain/shared/firestore/repository/user';
import { inject, singleton } from 'tsyringe';

@singleton()
export class FireStoreUserRepository implements IFireStoreUserRepository {
  public constructor(
    @inject('IFireStoreUserBaseRepository') private fireStoreUserBaseRepository: IFireStoreUserBaseRepository,
    @inject('IUserFactory') private userFactory: IUserFactory,
  ) {
  }

  public async find(uid: UserId): Promise<User | null> {
    const user = await this.fireStoreUserBaseRepository.find([], uid.value());
    if (!user.exists) {
      return null;
    }

    return this.userFactory.fromStoredUser(user.data());
  }

  public create(user: User): Promise<void> {
    return this.fireStoreUserBaseRepository.create([], user.login.value(), this.userFactory.toStoredUser(user));
  }
}
