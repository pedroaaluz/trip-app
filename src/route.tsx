/* eslint-disable react/no-unstable-nested-components */
import Menu from './pages/menu';
import Description from './pages/description';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StackParamsList, TabParamsList} from './types/rootStackParamListType';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator<TabParamsList>();
// RouteProp<RootStackParamList, keyof RootStackParamList>

const TabsStack = () => {
  const iconsFocused = {
    Menu: 'book-open',
    Favorites: 'star',
  };

  const iconsNoFocused = {
    Menu: 'book',
    Favorites: 'star',
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const iconName: string = focused
            ? iconsFocused[route.name]
            : iconsNoFocused[route.name];

          return <FeatherIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#11999e',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarAllowFontScaling: true,
      })}>
      {/* @ts-ignore i need read more about it*/}
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator<StackParamsList>();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tabs" component={TabsStack} />
        <Stack.Screen name="Description" component={Description} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
