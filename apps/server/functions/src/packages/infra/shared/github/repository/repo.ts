import type { IGitHubRepoRepository } from 'domain/shared/github/repository/repo';
import type { IOctokitService } from 'domain/shared/github/service/octokit';
import type { Repo } from 'domain/shared/github/entity/repo';
import type { AccessToken } from 'domain/shared/github/value/accessToken';
import type { UserId } from 'domain/shared/auth/value/userId';
import { singleton, inject } from 'tsyringe';

@singleton()
export class GitHubRepoRepository implements IGitHubRepoRepository {
  public constructor(
    @inject('IOctokitService') private octokitService: IOctokitService,
  ) {
  }

  public async listForUser(token: AccessToken, userId: UserId, perPage?: number, page?: number): Promise<Repo[]> {
    return (await this.octokitService.request(token, 'GET /users/{username}/repos', {
      username: userId.value(),
      per_page: perPage,
      page,
    })).map(repo => ({
      id: repo.id,
      owner: repo.owner?.login ?? repo.full_name.split('/')[0],
      name: repo.name,
      private: repo.private,
      fork: repo.fork,
      description: repo.description ?? '',
      url: repo.url,
      starCount: repo.stargazers_count ?? 0,
    } as Repo));
  }
}
