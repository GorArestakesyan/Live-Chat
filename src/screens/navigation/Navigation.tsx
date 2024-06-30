import React, {createContext, useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MessageScreen from '@screens/Message/Message';
import SearchScreen from '@screens/Search/Search';
import SignInScreen from '@screens/signIn/SignIn';
import SignUpScreen from '@screens/signUp/SignUp';
import Splash from '@screens/Splash';

import '@core/fontAwesome';
import {useGlobalState} from '@core/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '@utils/Colors';
import HomeScreen from '../homeScreen/HomeScreen';

const Stack = createStackNavigator();

export const ThemeContext = createContext<NonNullable<any>>(null);

const Navigation = () => {
  const authenticated = useGlobalState((state: any) => state?.authenticated);
  const initialized = useGlobalState((state: any) => state?.initialized);
  const init = useGlobalState((state: any) => state?.init);
  const [theme, setTheme] = useState(colors.dark);

  const headerTitleOptions = {
    headerTitleStyle: {
      color: theme.primaryText,
    },
  };

  const toggleTheme = async () => {
    const newTheme = theme === colors.light ? colors.dark : colors.light;
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
  };
  const loadTheme = async () => {
    const storedTheme = await AsyncStorage.getItem('theme');

    if (storedTheme) {
      const parsedTheme = JSON.parse(storedTheme);
      setTheme(parsedTheme);
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setTheme(JSON.parse(storedTheme));
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
        <ThemeContext.Provider
          value={{
            colors: theme,
            toggleTheme,
          }}>
          <StatusBar
          // barStyle={!isDarkMode ? 'dark-content' : 'light-content'}
          />
          <Stack.Navigator>
            {!initialized ? (
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{headerShown: false}}
              />
            ) : !authenticated ? (
              <>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                  name="Search"
                  component={SearchScreen}
                  options={headerTitleOptions}
                />
                <Stack.Screen
                  name="Messages"
                  component={MessageScreen}
                  options={{
                    headerTitleContainerStyle: {
                      backgroundColor: theme.background,
                    },
                    headerLeftContainerStyle: {
                      backgroundColor: theme.background,
                    },
                    headerBackgroundContainerStyle: {
                      backgroundColor: theme.background,
                    },
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </ThemeContext.Provider>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Navigation;
