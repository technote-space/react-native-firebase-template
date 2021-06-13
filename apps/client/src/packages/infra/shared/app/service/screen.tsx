import type { IScreenService } from 'domain/shared/app/service/screen';
import type { IAuthService } from 'domain/shared/auth/service';
import type { INavigatorService } from 'domain/shared/navigator/service';
import type { ILoggerService } from 'domain/shared/logger/service';
import type { ILoadingComponentService } from 'domain/shared/loading/service/component';
import type { ISettingContext } from 'domain/main/setting/entity/context';
import type { IThemeService } from 'domain/shared/theme/service';
import React, { memo, useEffect, useRef } from 'react';
import { ComponentService } from 'infra/shared/component/service';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { singleton, inject } from 'tsyringe';

@singleton()
export class ScreenService extends ComponentService implements IScreenService {
  public constructor(
    @inject('IAuthService') private authService: IAuthService,
    @inject('INavigatorService') private navigatorService: INavigatorService,
    @inject('ILoadingComponentService') private loadingComponentService: ILoadingComponentService,
    @inject('IThemeService') private themeService: IThemeService,
    @inject('ISettingContext') private settingContext: ISettingContext,
    @inject('ILoggerService') private loggerService: ILoggerService,
  ) {
    super();
  }

  protected getComponent() {
    const component = memo(() => {
      const userResult = this.authService.useUser();
      const routeNameRef = useRef();
      const navigationRef = useRef<any>(null);
      const darkMode = this.settingContext.useDarkMode();

      useEffect(() => {
        const name = userResult.isLoggedIn ? 'Main' : 'Login';
        navigationRef.current?.dispatch(CommonActions.reset({ index: 0, routes: [{ name }] }));
      }, [userResult.isLoggedIn]);

      return <PaperProvider theme={this.themeService.getTheme(darkMode)}>
        <NavigationContainer
          ref={navigationRef}
          theme={this.themeService.getTheme(darkMode)}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }}
          onStateChange={() => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {
              this.loggerService.debug(previousRouteName, currentRouteName);
            }

            routeNameRef.current = currentRouteName;
          }}
        >
          <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
          {this.navigatorService.render({})}
        </NavigationContainer>
        {this.loadingComponentService.render({})}
      </PaperProvider>;
    });
    component.displayName = 'ScreenService';

    return component;
  }

}
