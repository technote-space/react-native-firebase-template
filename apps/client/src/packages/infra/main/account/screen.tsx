import type { IAccountScreen } from 'domain/main/account/screen';
import type { IAuthService } from 'domain/shared/auth/service';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { inject, singleton } from 'tsyringe';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  wrap: {
    margin: 16,
  },
  button: {},
});

@singleton()
export class AccountScreen implements IAccountScreen {
  public constructor(
    @inject('IAuthService') private authService: IAuthService,
  ) {
  }

  public getComponent() {
    const component = memo(() => {
      const userResult = this.authService.useUser();
      const logout = this.authService.useLogout();

      return <View style={styles.screen}>
        {userResult.isLoggedIn && <View style={styles.wrap}>
          <Button
            icon="logout"
            uppercase={false}
            onPress={logout}
            style={styles.button}
          >Logout</Button>
        </View>}
      </View>;
    });
    component.displayName = 'AccountScreen';

    return component;
  }
}
