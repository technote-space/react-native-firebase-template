import { AdminInjector } from 'infra/shared/admin/injector';
import { EntryService } from 'infra/shared/app/service/entry';
import { UserFactory } from 'infra/shared/auth/factory/user';
import { AuthService } from 'infra/shared/auth/service';
import { FunctionsInjector } from 'infra/shared/functions/injector';
import { container } from 'tsyringe';

container.registerSingleton('IEntryService', EntryService);
container.registerSingleton('IAuthService', AuthService);

container.registerSingleton('IAdminInjector', AdminInjector);
container.registerSingleton('IFunctionsInjector', FunctionsInjector);
container.registerSingleton('IUserFactory', UserFactory);
