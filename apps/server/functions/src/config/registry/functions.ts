import { container } from 'tsyringe';

container.registerInstance('functions', {
  'login': 'ILoginUseCase',
  'getUser': 'IGetUserUseCase',
  'getUserRepos': 'IGetUserReposUseCase',
  'onSelect': 'IOnSelectUseCase',
  'offSelect': 'IOffSelectUseCase',
});
