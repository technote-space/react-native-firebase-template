import { container } from 'tsyringe';
import { UserMapper } from 'infra/auth/mapper/user';
import { LoginUseCase } from 'infra/auth/usecase/login';
import { GetUserUseCase } from 'infra/auth/usecase/getUser';

container.registerSingleton('IUserMapper', UserMapper);
container.registerSingleton('ILoginUseCase', LoginUseCase);
container.registerSingleton('IGetUserUseCase', GetUserUseCase);
