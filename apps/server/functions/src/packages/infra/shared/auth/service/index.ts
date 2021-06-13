import type { IAuthService, UserResult } from 'domain/shared/auth/service';
import type { IAdminFactory } from 'domain/shared/admin/factory';
import type { IFireStoreUserRepository } from 'domain/shared/firestore/repository/user';
import type { UserId } from 'domain/shared/auth/value/userId';
import { AccessToken } from 'domain/shared/github/value/accessToken';
import { singleton, inject } from 'tsyringe';

@singleton()
export class AuthService implements IAuthService {
  public constructor(
    @inject('IAdminFactory') private adminFactory: IAdminFactory,
    @inject('IFireStoreUserRepository') private fireStoreUserRepository: IFireStoreUserRepository,
  ) {
  }

  public async createToken(uid: UserId): Promise<AccessToken> {
    return AccessToken.create(await this.adminFactory.auth().createCustomToken(uid.value()));
  }

  public async getUser<Flag extends boolean>(uid: UserId, throwError?: Flag): Promise<UserResult<Flag>> {
    const user = await this.fireStoreUserRepository.find(uid);
    if (!user) {
      if (throwError) {
        throw new Error();
      }

      return null as UserResult<Flag>;
    }

    return user as UserResult<Flag>;
  }

  public async getAccessToken(uid: UserId): Promise<AccessToken> | never {
    const user = await this.fireStoreUserRepository.find(uid);
    if (!user) {
      throw Error();
    }

    return user.accessToken;
  }
}
