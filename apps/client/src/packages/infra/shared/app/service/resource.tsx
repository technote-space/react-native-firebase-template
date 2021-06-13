import type { IResourceService } from 'domain/shared/app/service/resource';
import React, { useState, useCallback } from 'react';
import { singleton } from 'tsyringe';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';

@singleton()
export class ResourceService implements IResourceService {
  public constructor() {
  }

  public useResource(): [boolean, (React.ReactElement | null)] {
    const [isLoading, setIsLoading] = useState(true);
    const loadResources = useCallback(async () => {
      await Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
      });
    }, []);
    const handleLoadingError = useCallback((error: Error) => {
      console.log(error);
    }, []);
    const handleFinishLoading = useCallback(() => {
      setIsLoading(false);
    }, []);

    return [isLoading, isLoading ? <AppLoading
      startAsync={loadResources}
      onError={handleLoadingError}
      onFinish={handleFinishLoading}
    /> : null];
  }
}
  