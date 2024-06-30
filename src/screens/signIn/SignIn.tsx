import Button from '@components/Button';
import Input from '@components/Input';
import api from '@core/api';
import {useGlobalState} from '@core/global';
import utils from '@core/utils';
import {ThemeContext} from '@screens/navigation/Navigation';
import {IGlobalState} from '@src/core/types';
import {BEHAVIOR} from '@utils/constants';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Title from '../../common/Title';

const SignInScreen = ({navigation}: any) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userNameError, setUsernameError] = useState('');

  const {colors} = useContext(ThemeContext);

  const login = useGlobalState((state: IGlobalState) => state.login);

  const handleSignIn = () => {
    const failedUserName = !userName;
    const failedPassword = !password;
    if (failedUserName) {
      setUsernameError('Username not provided');
    }
    if (failedPassword) {
      setPasswordError('Password not provided');
    }
    if (failedPassword || failedUserName) {
      return;
    }
    // doing request

    api({
      method: 'POST',
      url: '/chat/signin/',
      data: {
        username: userName,
        password: password,
      },
    })
      .then(response => {
        const credentials = {
          username: userName,
          password,
        };
        // example of custom log function with formating
        utils.log(response.data.user);
        login(credentials, response.data.user, response.data.tokens);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
  const handleSignUp = () => navigation.navigate('SignUp');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeyboardAvoidingView behavior={BEHAVIOR} style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <View
            style={[
              styles.signInContainer,
              {backgroundColor: colors.background},
            ]}>
            <Title text="RealtimeChat" color={colors.primaryText} />
            <Input
              title={'Username'}
              value={userName}
              onChange={setUserName}
              error={userNameError}
              isPassword={false}
              setError={setUsernameError}
            />
            <Input
              title={'Password'}
              value={password}
              onChange={setPassword}
              error={passwordError}
              isPassword={true}
              setError={setPasswordError}
            />
            <Button title="Sign In" onPress={handleSignIn} />
            <Text style={[styles.getAccText, {color: colors.primaryText}]}>
              Don't have an account?{' '}
              <Text style={styles.signUp} onPress={handleSignUp}>
                Sign up
              </Text>
            </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  signInContainer: {
    flex: 1,
    alignItems: 'center',

    justifyContent: 'center',
  },
  getAccText: {
    textAlign: 'center',
    marginTop: 40,
  },
  signUp: {
    color: 'blue',
  },
});
