import { GitHubRepoRepository } from 'infra/shared/github/repository/repo';
import { GitHubUserRepository } from 'infra/shared/github/repository/user';
import { OctokitService } from 'infra/shared/github/service/octokit';
import { container } from 'tsyringe';

container.registerSingleton('IOctokitService', OctokitService);
container.registerSingleton('IGitHubUserRepository', GitHubUserRepository);
container.registerSingleton('IGitHubRepoRepository', GitHubRepoRepository);
