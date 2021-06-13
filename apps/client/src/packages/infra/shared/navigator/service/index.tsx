import type { ComponentType } from 'react';
import type { INavigatorService } from 'domain/shared/navigator/service';
import type { IScreenComponentService } from 'domain/shared/component/service/screen';
import type { NavigatorItem, NavigatorSetting } from 'domain/shared/navigator/entity/navigator';
import type { StackNavigationOptions } from '@react-navigation/stack';
import type { MaterialBottomTabNavigationOptions } from '@react-navigation/material-bottom-tabs';
import type { StackNavigationConfig } from '@react-navigation/stack/src/types';
import type { MaterialBottomTabNavigationConfig } from '@react-navigation/material-bottom-tabs/src/types';
import { ComponentService } from 'infra/shared/component/service';
import React, { memo } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { singleton, inject, container } from 'tsyringe';

@singleton()
export class NavigatorService extends ComponentService implements INavigatorService {
  private __cache: Record<string, ComponentType<any>> = {};

  public constructor(
    @inject('navigator') private navigator: NavigatorSetting,
  ) {
    super();
  }

  private createComponent(item: NavigatorItem): ComponentType<any> {
    if ('type' in item) {
      if (item.type === 'stack') {
        return this.createStackNavigator(item.items, item.initialRouteName, item.config);
      }

      return this.createBottomTabNavigator(item.items, item.initialRouteName, item.config);
    }

    if (!(item.screen in this.__cache)) {
      this.__cache[item.screen] = container.resolve<IScreenComponentService>(item.screen).getComponent();
    }

    return this.__cache[item.screen];
  }

  private static getOptions<T>(item: NavigatorItem) {
    if (!item.options) {
      return undefined;
    }

    return item.options as T;
  }

  private createStackNavigator(items: Array<NavigatorItem>, initialRouteName?: string, config?: StackNavigationConfig): ComponentType<any> {
    const Stack = createStackNavigator();
    const itemsWithComponent = items.map(item => ({
      ...item,
      component: this.createComponent(item),
    }));

    return () => <Stack.Navigator
      {...config}
      initialRouteName={initialRouteName ?? items[0].name}
    >
      {itemsWithComponent.map(item =>
        <Stack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            ...NavigatorService.getOptions<StackNavigationOptions>(item),
          }}
        />)}
    </Stack.Navigator>;
  }

  private createBottomTabNavigator(items: Array<NavigatorItem>, initialRouteName?: string, config?: MaterialBottomTabNavigationConfig): ComponentType<any> {
    const Tab = createMaterialBottomTabNavigator();
    const itemsWithComponent = items.map(item => ({
      ...item,
      component: this.createComponent(item),
    }));

    return () => <Tab.Navigator
      {...config}
      initialRouteName={initialRouteName ?? items[0].name}
    >
      {itemsWithComponent.map(item =>
        <Tab.Screen
          name={item.name}
          component={item.component}
          key={item.name}
          options={{
            ...NavigatorService.getOptions<MaterialBottomTabNavigationOptions>(item),
            tabBarLabel: 'label' in item ? item.label : item.options?.title ?? item.name,
            tabBarIcon: ({ color }) =>
              <FontAwesome name={'icon' in item ? item.icon : 'bars'} color={color} />,
          }}
        />)}
    </Tab.Navigator>;
  }

  protected getComponent() {
    const component = memo(() => {
      const Component = this.createComponent({
        ...this.navigator,
        type: 'stack',
        name: '',
      });

      return <Component />;
    });
    component.displayName = 'NavigatorService';

    return component;
  }
}
