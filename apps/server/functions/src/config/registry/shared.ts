import { container } from 'tsyringe';
import { EntryService } from 'infra/shared/app/service/entry';
import { AuthService } from 'infra/shared/auth/service';
import { AdminFactory } from 'infra/shared/admin/factory';
import { FunctionsFactory } from 'infra/shared/functions/factory';
import { UserFactory } from 'infra/shared/auth/factory/user';

container.registerSingleton('IEntryService', EntryService);
container.registerSingleton('IAuthService', AuthService);

container.registerSingleton('IAdminFactory', AdminFactory);
container.registerSingleton('IFunctionsFactory', FunctionsFactory);
container.registerSingleton('IUserFactory', UserFactory);
