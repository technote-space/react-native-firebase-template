import type { ISplashScreen } from 'domain/splash/screen';
import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Splash } from 'root/assets/images';
import { singleton } from 'tsyringe';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

@singleton()
export class SplashScreen implements ISplashScreen {
  public getComponent() {
    const component = memo(() => {
      return <View style={styles.screen}>
        <Image source={Splash} resizeMode="contain" style={styles.image} />
      </View>;
    });
    component.displayName = 'SplashScreen';

    return component;
  }
}
