import type { IRepoRepository } from 'domain/repo/repository/repo';
import type { DataType, IOffSelectUseCase } from 'domain/repo/usecase/offSelect';
import type { AuthedCallableContext } from 'domain/shared/functions/entity/context';
import { UserId } from 'domain/shared/auth/value/userId';
import { AuthedCallUseCase } from 'infra/shared/functions/entity/usecase';
import { inject, singleton } from 'tsyringe';

@singleton()
export class OffSelectUseCase extends AuthedCallUseCase<DataType> implements IOffSelectUseCase {
  public constructor(
    @inject('IRepoRepository') private repository: IRepoRepository,
  ) {
    super();
  }

  public async callHandler(data: DataType, context: AuthedCallableContext) {
    return this.repository.offSelect(
      UserId.create(context.auth.uid),
      data.repo,
    );
  }
}
