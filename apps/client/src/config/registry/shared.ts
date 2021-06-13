import { container } from 'tsyringe';
import { RootService } from 'infra/shared/app/service/root';
import { ScreenService } from 'infra/shared/app/service/screen';
import { NotificationService } from 'infra/shared/app/service/notification';
import { UpdateService } from 'infra/shared/app/service/update';
import { AuthService } from 'infra/shared/auth/service';
import { LoggerService } from 'infra/shared/logger/service/inidex';
import { ResourceService } from 'infra/shared/app/service/resource';
import { StateService } from 'infra/shared/app/service/state';
import { DeviceService } from 'infra/shared/app/service/device';
import { FunctionsService } from 'infra/shared/functions/service';
import { StoreFactory } from 'infra/shared/store/factory';
import { LoadingService } from 'infra/shared/loading/service';
import { LoadingComponentService } from 'infra/shared/loading/service/component';
import { NavigatorService } from 'infra/shared/navigator/service';
import { ThemeService } from 'infra/shared/theme/service';

container.registerSingleton('IRootService', RootService);
container.registerSingleton('IScreenService', ScreenService);
container.registerSingleton('INotificationService', NotificationService);
container.registerSingleton('IUpdateService', UpdateService);
container.registerSingleton('IAuthService', AuthService);
container.registerSingleton('ILoggerService', LoggerService);
container.registerSingleton('IResourceService', ResourceService);
container.registerSingleton('IStateService', StateService);
container.registerSingleton('IDeviceService', DeviceService);
container.registerSingleton('IFunctionsService', FunctionsService);
container.registerSingleton('IStoreFactory', StoreFactory);
container.registerSingleton('ILoadingService', LoadingService);
container.registerSingleton('ILoadingComponentService', LoadingComponentService);
container.registerSingleton('INavigatorService', NavigatorService);
container.registerSingleton('IThemeService', ThemeService);
