import type { ILoadingComponentService } from 'domain/shared/loading/service/component';
import type { ILoadingContext } from 'domain/shared/loading/entity/context';
import React, { memo } from 'react';
import { ComponentService } from 'infra/shared/component/service';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Modal, Portal, ProgressBar, Text } from 'react-native-paper';
import { singleton, inject } from 'tsyringe';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 0,
  },
});

@singleton()
export class LoadingComponentService extends ComponentService implements ILoadingComponentService {
  public constructor(
    @inject('ILoadingContext') private loadingContext: ILoadingContext,
  ) {
    super();
  }

  protected getComponent() {
    const component = memo(() => {
      const process = this.loadingContext.useProcess();

      return <Portal>
        <Modal visible={!!process.length}>
          <ActivityIndicator animating={true} size="large" />
          {process[0]?.message && <Text style={styles.text}>{process[0].message}</Text>}
          {process[0]?.progress && <ProgressBar progress={process[0].progress} />}
        </Modal>
      </Portal>;
    });
    component.displayName = 'LoadingComponentService';

    return component;
  }
}
