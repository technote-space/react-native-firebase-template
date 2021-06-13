import type { User } from 'domain/shared/github/entity/user';
import type { IGitHubUserRepository } from 'domain/shared/github/repository/user';
import type { IOctokitService } from 'domain/shared/github/service/octokit';
import type { AccessToken } from 'domain/shared/github/value/accessToken';
import { inject, singleton } from 'tsyringe';

@singleton()
export class GitHubUserRepository implements IGitHubUserRepository {
  public constructor(
    @inject('IOctokitService') private octokitService: IOctokitService,
  ) {
  }

  public async find(token: AccessToken): Promise<User> {
    const user = await this.octokitService.request(token, 'GET /user');
    return {
      login: user.login,
      id: user.id,
      avatarUrl: user.avatar_url,
      name: user.name ?? user.login,
      accessToken: token.value(),
    };
  }
}
