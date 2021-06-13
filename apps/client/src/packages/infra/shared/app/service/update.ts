import type { AppStateStatus } from 'react-native';
import type { IUpdateService } from 'domain/shared/app/service/update';
import type { IDeviceService } from 'domain/shared/app/service/device';
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';
import { inject, singleton } from 'tsyringe';

@singleton()
export class UpdateService implements IUpdateService {
  public constructor(
    @inject('IDeviceService') private deviceService: IDeviceService,
  ) {
  }

  private static async isRequiredUpdate(): Promise<boolean> {
    if (__DEV__) {
      return false;
    }

    try {
      const update = await Updates.checkForUpdateAsync();
      return update.isAvailable;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async update(state: AppStateStatus): Promise<void> {
    if (state !== 'active' || this.deviceService.isWeb()) {
      return;
    }

    if (await UpdateService.isRequiredUpdate()) {
      await Updates.fetchUpdateAsync();
      Alert.alert(
        'お知らせ',
        '快適にご利用いただくため、最新版へのアップデートが必要です',
        [{ text: 'アップデートする', onPress: () => Updates.reloadAsync() }],
      );
    }
  }
}
