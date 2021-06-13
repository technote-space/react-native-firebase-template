import type { VFC } from 'react';
import type { InitialProps } from 'expo/build/launch/withExpoRoot.types';
import type { IRootService } from 'domain/shared/app/service/root';
import type { IResourceService } from 'domain/shared/app/service/resource';
import type { IStateService } from 'domain/shared/app/service/state';
import type { INotificationService } from 'domain/shared/app/service/notification';
import type { IStoreFactory } from 'domain/shared/store/factory';
import type { IScreenService } from 'domain/shared/app/service/screen';
import React, { memo, useEffect } from 'react';
import { AppState } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { singleton, inject } from 'tsyringe';

@singleton()
export class RootService implements IRootService {
  public constructor(
    @inject('IScreenService') private screenService: IScreenService,
    @inject('IResourceService') private resourceService: IResourceService,
    @inject('IStateService') private stateService: IStateService,
    @inject('INotificationService') private notificationService: INotificationService,
    @inject('IStoreFactory') private storeFactory: IStoreFactory<never>,
  ) {
  }

  public get(): VFC<InitialProps> {
    const component = memo(() => {
      const [isLoadingResource, LoadingResource] = this.resourceService.useResource();

      useEffect(() => {
        (async () => {
          await this.stateService.setup();
        })();
        this.notificationService.setup();
        AppState.addEventListener('change', this.stateService.getListener());

        return () => {
          this.notificationService.teardown();
          AppState.removeEventListener('change', this.stateService.getListener());
        };
      }, []);

      const Provider = this.storeFactory.getStoreProvider();
      return <>
        {isLoadingResource && LoadingResource}
        {!isLoadingResource && <Provider>
          <ActionSheetProvider>
            {this.screenService.render({})}
          </ActionSheetProvider>
        </Provider>}
      </>;
    });
    component.displayName = 'RootService';

    return component;
  }
}
