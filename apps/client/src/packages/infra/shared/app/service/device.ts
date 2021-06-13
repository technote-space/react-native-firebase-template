import type { IDeviceService } from 'domain/shared/app/service/device';
import { Platform } from 'react-native';
import { singleton } from 'tsyringe';

@singleton()
export class DeviceService implements IDeviceService {
  public isWeb(): boolean {
    return Platform.OS === 'web';
  }

  public isAndroid(): boolean {
    return Platform.OS === 'android';
  }

  public isIOs(): boolean {
    return Platform.OS === 'ios';
  }
}
