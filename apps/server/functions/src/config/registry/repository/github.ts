import { container } from 'tsyringe';
import { OctokitService } from 'infra/shared/github/service/octokit';
import { GitHubUserRepository } from 'infra/shared/github/repository/user';
import { GitHubRepoRepository } from 'infra/shared/github/repository/repo';

container.registerSingleton('IOctokitService', OctokitService);
container.registerSingleton('IGitHubUserRepository', GitHubUserRepository);
container.registerSingleton('IGitHubRepoRepository', GitHubRepoRepository);
