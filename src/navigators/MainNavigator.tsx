import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import RegisterScreen from '../screens/Auth/Register/RegisterScreen';
import SplashScreen from '../screens/Splash/SplashScreen';

import {createNavigationContainerRef} from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          options={{headerShown: false}}
          component={RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
