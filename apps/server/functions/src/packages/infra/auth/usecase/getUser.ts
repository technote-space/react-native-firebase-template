import type { IGetUserUseCase } from 'domain/auth/usecase/getUser';
import type { IAuthService } from 'domain/shared/auth/service';
import type { AuthedCallableContext } from 'domain/shared/functions/entity/context';
import { AuthedCallUseCase } from 'infra/shared/functions/entity/usecase';
import { UserId } from 'domain/shared/auth/value/userId';
import { singleton, inject } from 'tsyringe';
import { IUserMapper } from 'domain/auth/mapper/user';

@singleton()
export class GetUserUseCase extends AuthedCallUseCase implements IGetUserUseCase {
  public constructor(
    @inject('IAuthService') private authService: IAuthService,
    @inject('IUserMapper') private userMapper: IUserMapper,
  ) {
    super();
  }

  public async callHandler(data: never, context: AuthedCallableContext) {
    return this.userMapper.fromEntity(await this.authService.getUser(UserId.create(context.auth.uid)));
  }
}
