import type { INotificationService } from 'domain/shared/app/service/notification';
import type { LogoutCallback } from 'domain/shared/auth/entity/callback';
import type { IAuthContext } from 'domain/shared/auth/entity/context';
import type { GitHubConfig } from 'domain/shared/auth/entity/oauth';
import type { UserResult } from 'domain/shared/auth/entity/result';
import type { User } from 'domain/shared/auth/entity/user';
import type { IAuthService } from 'domain/shared/auth/service';
import type { IFunctionsService } from 'domain/shared/functions/service';
import type { ILoadingContext } from 'domain/shared/loading/entity/context';
import type { ILoadingService } from 'domain/shared/loading/service';
import type { ILoggerService } from 'domain/shared/logger/service';
import type firebase from 'firebase';
import { useDispatch } from 'domain/shared/store/entity/context';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Platform, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { inject, singleton } from 'tsyringe';

const styles = StyleSheet.create({
  wrap: {
    margin: 16,
  },
  button: {
    backgroundColor: 'white',
  },
});

@singleton()
export class AuthService implements IAuthService {
  public constructor(
    @inject('IAuthContext') private authContext: IAuthContext,
    @inject('ILoadingContext') private loadingContext: ILoadingContext,
    @inject('IFunctionsService') private functionsService: IFunctionsService,
    @inject('ILoadingService') private loadingService: ILoadingService,
    @inject('INotificationService') private notificationService: INotificationService,
    @inject('ILoggerService') private loggerService: ILoggerService,
    @inject('firebase.auth') private auth: firebase.auth.Auth,
    @inject('oauth.github') private gitHubConfig: GitHubConfig,
  ) {
    WebBrowser.maybeCompleteAuthSession();
    this.gitHubConfig.useProxy = Platform.select({ web: false, default: true });
    this.gitHubConfig.redirectUri = makeRedirectUri({
      useProxy: this.gitHubConfig.useProxy,
    });
  }

  public useUser(): UserResult {
    const [firebaseAuth, isAuthLoading] = useAuthState(this.auth);
    const discovery = useMemo(() => ({
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      revocationEndpoint: `https://github.com/settings/connections/applications/${this.gitHubConfig.clientId}`,
    }), []);
    const [request, response, promptAsync] = useAuthRequest(
      this.gitHubConfig,
      discovery,
    );
    const user = this.authContext.useUser();
    const process = this.loadingContext.useProcess();
    const dispatch = useDispatch();
    const withLoading = this.loadingService.useLoading();

    useEffect(() => {
      // firebase にログインしていない場合、ログインボタンを表示
      if (!isAuthLoading && !firebaseAuth && request && user.isLoading) {
        this.authContext.setUser(dispatch, {
          isLoading: false,
          isLogin: true,
          isLoggedIn: false,
          component: <View style={styles.wrap}>
            <Button
              icon="github"
              uppercase={false}
              onPress={() => promptAsync({ useProxy: this.gitHubConfig.useProxy })}
              style={styles.button}
            >Login with GitHub</Button>
          </View>,
        });
      }
    }, [isAuthLoading, firebaseAuth, request, user.isLoading]);

    useEffect(() => {
      if (response?.type !== 'success') {
        return;
      }

      // GitHub からのレスポンスが成功の場合、functions の login を呼び出してログイン処理を実行
      // 帰ってきた token で firebase にログイン
      (async() => {
        await withLoading(async() => {
          const { token } = await this.functionsService.call<{ token: string }>('login', {
            code: response.params.code,
            state: request?.state,
          });
          this.loggerService.debug(token);
          await this.auth.signInWithCustomToken(token);
        }, 'Now logging with GitHub...');
      })();
    }, [response?.type, response?.type === 'success' ? response.params.code : '']);

    useEffect(() => {
      if (this.loadingService.isProcessRunning('getUser', process)) {
        return;
      }

      if (firebaseAuth?.uid && !user.isLoggedIn) {
        // firebase にログインしている場合、getUser でユーザー情報取得
        (async() => {
          await withLoading(async() => {
            const user = await this.functionsService.call<User | null>('getUser');
            this.loggerService.debug(user);

            if (!user) {
              this.authContext.setUser(dispatch, { isLoading: true, isLogin: false, isLoggedIn: false });
              await this.auth.signOut();
            } else {
              this.authContext.setUser(dispatch, {
                isLoading: false,
                isLogin: false,
                isLoggedIn: true,
                user,
              });
            }
          }, 'Now getting user info...', 'getUser');

          // notification 設定
          await this.notificationService.register(firebaseAuth.uid);
        })();
      }
    }, [firebaseAuth?.uid, user.isLoggedIn]);

    return user;
  }

  public useLogout(): LogoutCallback {
    const dispatch = useDispatch();
    const [firebaseAuth] = useAuthState(this.auth);
    return useCallback(async() => {
      if (firebaseAuth?.uid) {
        await this.notificationService.unregister(firebaseAuth.uid);
        await this.auth.signOut();
      }

      this.authContext.setUser(dispatch, { isLoading: true, isLogin: false, isLoggedIn: false });
    }, [firebaseAuth?.uid]);
  }
}
