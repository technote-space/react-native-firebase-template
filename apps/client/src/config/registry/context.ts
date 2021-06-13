import { SettingContext } from 'infra/main/setting/entity/context';
import { AuthContext } from 'infra/shared/auth/entity/context';
import { LoadingContext } from 'infra/shared/loading/entity/context';
import { container } from 'tsyringe';

container.registerSingleton('IAuthContext', AuthContext);
container.registerSingleton('ILoadingContext', LoadingContext);
container.registerSingleton('ISettingContext', SettingContext);
container.registerInstance('contexts', [
  'IAuthContext',
  'ILoadingContext',
  'ISettingContext',
]);
