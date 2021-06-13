import type { IRepoRepository } from 'domain/repo/repository/repo';
import type { DataType, IGetUserReposUseCase } from 'domain/repo/usecase/getUserRepos';
import type { IAuthService } from 'domain/shared/auth/service';
import type { AuthedCallableContext } from 'domain/shared/functions/entity/context';
import { UserId } from 'domain/shared/auth/value/userId';
import { AuthedCallUseCase } from 'infra/shared/functions/entity/usecase';
import { inject, singleton } from 'tsyringe';

@singleton()
export class GetUserReposUseCase extends AuthedCallUseCase<DataType> implements IGetUserReposUseCase {
  public constructor(
    @inject('IAuthService') private authService: IAuthService,
    @inject('IRepoRepository') private repository: IRepoRepository,
  ) {
    super();
  }

  public async callHandler(data: DataType, context: AuthedCallableContext) {
    return this.repository.listForUser(
      await this.authService.getAccessToken(UserId.create(context.auth.uid)),
      UserId.create(context.auth.uid),
      data.page,
    );
  }
}
