import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from '../screens/MainScreen';
import TabNavigation from '../tabNavigation/TabNavigation';
import Detail from '../screens/Detail';
import React from 'react';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MainScreen'>
        <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={TabNavigation} options={{ headerShown: false }} />
        <Stack.Screen name='Detail' component={Detail} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
