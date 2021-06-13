import type { NavigatorSetting } from 'domain/shared/navigator/entity/navigator';
import { container } from 'tsyringe';
import { SplashScreen } from 'infra/splash/screen';
import { LoginScreen } from 'infra/login/screen';
import { AccountScreen } from 'infra/main/account/screen';
import { ReposScreen } from 'infra/main/repos/screen';
import { SettingScreen } from 'infra/main/setting/screen';

container.registerSingleton('ISplashScreen', SplashScreen);
container.registerSingleton('ILoginScreen', LoginScreen);
container.registerSingleton('IReposScreen', ReposScreen);
container.registerSingleton('IAccountScreen', AccountScreen);
container.registerSingleton('ISettingScreen', SettingScreen);

container.registerInstance('navigator', {
  items: [
    { name: 'Splash', screen: 'ISplashScreen', options: { headerShown: false } },
    { name: 'Login', screen: 'ILoginScreen', options: { headerShown: false } },
    {
      name: 'Main', type: 'bottom', options: { headerShown: false }, items: [
        {
          name: 'Repos', type: 'stack', icon: 'list', label: 'リポジトリ', items: [
            { name: 'Repos', screen: 'IReposScreen', options: { title: 'リポジトリ' } },
          ],
        },
        {
          name: 'Account', type: 'stack', icon: 'user', label: 'アカウント', items: [
            { name: 'Account', screen: 'IAccountScreen', options: { title: 'アカウント' } },
          ],
        },
        {
          name: 'Setting', type: 'stack', icon: 'cog', label: '設定', items: [
            { name: 'Setting', screen: 'ISettingScreen', options: { title: '設定' } },
          ],
        },
      ],
    },
  ],
} as NavigatorSetting);
