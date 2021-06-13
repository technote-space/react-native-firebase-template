import type { Subscription } from '@unimodules/core';
import type { IDeviceService } from 'domain/shared/app/service/device';
import type { INotificationService } from 'domain/shared/app/service/notification';
import type { ILoggerService } from 'domain/shared/logger/service';
import * as Notifications from 'expo-notifications';
import { AppState } from 'react-native';
import { inject, singleton } from 'tsyringe';

@singleton()
export class NotificationService implements INotificationService {
  private __subscriptions: Array<Subscription> = [];

  public constructor(
    @inject('IDeviceService') private deviceService: IDeviceService,
    @inject('ILoggerService') private loggerService: ILoggerService,
  ) {
    if (this.deviceService.isWeb()) {
      return;
    }

    Notifications.setNotificationHandler({
      handleNotification: async() => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }

  public setup(): void {
    if (this.deviceService.isWeb()) {
      return;
    }

    this.__subscriptions.push(Notifications.addNotificationReceivedListener(notification => {
      this.loggerService.debug(notification);
      if (AppState.currentState === 'active') {
        this.dismiss().then();
      }
    }));
    this.__subscriptions.push(Notifications.addNotificationResponseReceivedListener(response => {
      this.loggerService.debug(response);
    }));
  }

  public teardown(): void {
    if (this.deviceService.isWeb()) {
      return;
    }

    this.__subscriptions.forEach(subscription => {
      subscription.remove();
    });
    this.__subscriptions.length = 0;
  }

  public async register(uid: string): Promise<void> {
    if (this.deviceService.isWeb()) {
      return;
    }

    try {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      // TODO: firestore のユーザーの push token を追加する

    } catch (error) {
      this.loggerService.warn(error);
      return;
    }

    if (this.deviceService.isAndroid()) {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }

  public async unregister(uid: string): Promise<void> {
    if (this.deviceService.isWeb()) {
      return;
    }

    try {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      // TODO: firestore のユーザーの push token を外す

    } catch (error) {
      this.loggerService.warn(error);
      return;
    }
  }

  public async dismiss(): Promise<void> {
    if (this.deviceService.isWeb()) {
      return;
    }

    await Notifications.setBadgeCountAsync(0);
    await Notifications.dismissAllNotificationsAsync();

    // TODO: firestore の badges を 0 にする
  }
}
