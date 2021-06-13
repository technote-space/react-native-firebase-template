import { AdminFactory } from 'infra/shared/admin/factory';
import { EntryService } from 'infra/shared/app/service/entry';
import { UserFactory } from 'infra/shared/auth/factory/user';
import { AuthService } from 'infra/shared/auth/service';
import { FunctionsFactory } from 'infra/shared/functions/factory';
import { container } from 'tsyringe';

container.registerSingleton('IEntryService', EntryService);
container.registerSingleton('IAuthService', AuthService);

container.registerSingleton('IAdminFactory', AdminFactory);
container.registerSingleton('IFunctionsFactory', FunctionsFactory);
container.registerSingleton('IUserFactory', UserFactory);
