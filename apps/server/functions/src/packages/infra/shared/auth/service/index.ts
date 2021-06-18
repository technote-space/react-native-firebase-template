import type { IAdminInjector } from 'domain/shared/admin/injector';
import type { IAuthService, UserResult } from 'domain/shared/auth/service';
import type { UserId } from 'domain/shared/auth/value/userId';
import type { IFireStoreUserRepository } from 'domain/shared/firestore/repository/user';
import { AccessToken } from 'domain/shared/github/value/accessToken';
import { inject, singleton } from 'tsyringe';

@singleton()
export class AuthService implements IAuthService {
  public constructor(
    @inject('IAdminInjector') private adminInjector: IAdminInjector,
    @inject('IFireStoreUserRepository') private fireStoreUserRepository: IFireStoreUserRepository,
  ) {
  }

  public async createToken(uid: UserId): Promise<AccessToken> {
    return AccessToken.create(await this.adminInjector.auth().createCustomToken(uid.value()));
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
