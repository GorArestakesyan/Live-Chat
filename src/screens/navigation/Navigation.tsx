import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../homeScreen/HomeScreen';
import MessageScreen from '../Message/Message';
import SearchScreen from '../Search/Search';
import SignInScreen from '../signIn/SignIn';
import SignUpScreen from '../signUp/SignUp';
import Splash from '../Splash';

import '../../core/fontAwesome';
import {useGlobalState} from '../../core/global';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const Stack = createStackNavigator();

const Navigation = () => {
  const authenticated = useGlobalState((state: any) => state?.authenticated);
  const initialized = useGlobalState((state: any) => state?.initialized);
  const init = useGlobalState((state: any) => state?.init);
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer theme={LightTheme}>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator>
        {!initialized ? (
          <>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{headerShown: false}}
            />
          </>
        ) : !authenticated ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen
              name="Messages"
              component={MessageScreen}
              options={{
                headerTitleContainerStyle: {backgroundColor: '#fff'},
                headerLeftContainerStyle: {backgroundColor: '#fff'},
                headerBackgroundContainerStyle: {backgroundColor: '#fff'},
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
