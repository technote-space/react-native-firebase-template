import type { ILoginUseCase, DataType } from 'domain/auth/usecase/login';
import type { IAuthService } from 'domain/shared/auth/service';
import type { IFireStoreUserRepository } from 'domain/shared/firestore/repository/user';
import type { IGitHubUserRepository } from 'domain/shared/github/repository/user';
import type { IUserFactory } from 'domain/shared/auth/factory/user';
import type { User } from 'domain/shared/auth/entity/user';
import type { CallableContext } from 'domain/shared/functions/entity/context';
import { CallUseCase } from 'infra/shared/functions/entity/usecase';
import fetch from 'node-fetch';
import { singleton, inject } from 'tsyringe';
import { AccessToken } from 'domain/shared/github/value/accessToken';

@singleton()
export class LoginUseCase extends CallUseCase<DataType> implements ILoginUseCase {
  public constructor(
    @inject('IFireStoreUserRepository') private fireStoreUserRepository: IFireStoreUserRepository,
    @inject('IGitHubUserRepository') private githubUserRepository: IGitHubUserRepository,
    @inject('IAuthService') private authService: IAuthService,
    @inject('IUserFactory') private userFactory: IUserFactory,
  ) {
    super();
  }

  private static async getAccessToken(code: string, state: string): Promise<AccessToken> {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const response = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&state=${state}`,
      { method: 'POST', headers: { Accept: 'application/json' } },
    );
    const json = await response.json() as { access_token: string };

    return AccessToken.create(json.access_token);
  }

  private async getUser(accessToken: AccessToken): Promise<User> {
    return this.userFactory.fromGitHubUser(await this.githubUserRepository.find(accessToken));
  }

  public async callHandler(data: DataType, context: CallableContext) {
    const accessToken = await LoginUseCase.getAccessToken(data.code, data.state);
    const user = await this.getUser(accessToken);

    const stored = await this.fireStoreUserRepository.find(user.login);
    if (!stored) {
      await this.fireStoreUserRepository.create(user);
    }

    const token = await this.authService.createToken(user.login);
    return { token: token.value() };
  }
}
