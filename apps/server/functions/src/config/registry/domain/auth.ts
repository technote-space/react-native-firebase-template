import { UserMapper } from 'infra/auth/mapper/user';
import { GetUserUseCase } from 'infra/auth/usecase/getUser';
import { LoginUseCase } from 'infra/auth/usecase/login';
import { container } from 'tsyringe';

container.registerSingleton('IUserMapper', UserMapper);
container.registerSingleton('ILoginUseCase', LoginUseCase);
container.registerSingleton('IGetUserUseCase', GetUserUseCase);
