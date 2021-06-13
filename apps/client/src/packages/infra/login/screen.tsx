import type { ILoginScreen } from 'domain/login/screen';
import type { IAuthService } from 'domain/shared/auth/service';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { inject, singleton } from 'tsyringe';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

@singleton()
export class LoginScreen implements ILoginScreen {
  public constructor(
    @inject('IAuthService') private authService: IAuthService,
  ) {
  }

  public getComponent() {
    const component = memo(() => {
      const userResult = this.authService.useUser();

      return <View style={styles.container}>
        {userResult.isLogin && userResult.component}
      </View>;
    });
    component.displayName = 'LoginScreen';

    return component;
  }
}
