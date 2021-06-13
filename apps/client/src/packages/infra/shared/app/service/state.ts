import type { INotificationService } from 'domain/shared/app/service/notification';
import type { IStateService } from 'domain/shared/app/service/state';
import type { IUpdateService } from 'domain/shared/app/service/update';
import type { AppStateStatus } from 'react-native';
import { inject, singleton } from 'tsyringe';

@singleton()
export class StateService implements IStateService {
  private readonly __listener: (state: AppStateStatus) => void;

  public constructor(
    @inject('IUpdateService') private updateService: IUpdateService,
    @inject('INotificationService') private notificationService: INotificationService,
  ) {
    this.__listener = state => {
      if (state === 'active') {
        this.updateService.update('active').then();
        this.notificationService.dismiss().then();
      }
    };
  }

  public async setup(): Promise<void> {
    await Promise.all([
      this.updateService.update('active'),
      this.notificationService.dismiss(),
    ]);
  }

  public getListener(): (state: AppStateStatus) => void {
    return this.__listener;
  }
}
