import type { IRepoRepository } from 'domain/repo/repository/repo';
import type { DataType, IOnSelectUseCase } from 'domain/repo/usecase/onSelect';
import type { AuthedCallableContext } from 'domain/shared/functions/entity/context';
import { UserId } from 'domain/shared/auth/value/userId';
import { AuthedCallUseCase } from 'infra/shared/functions/entity/usecase';
import { inject, singleton } from 'tsyringe';

@singleton()
export class OnSelectUseCase extends AuthedCallUseCase<DataType> implements IOnSelectUseCase {
  public constructor(
    @inject('IRepoRepository') private repository: IRepoRepository,
  ) {
    super();
  }

  public async callHandler(data: DataType, context: AuthedCallableContext) {
    return this.repository.onSelect(
      UserId.create(context.auth.uid),
      data.repo,
    );
  }
}
