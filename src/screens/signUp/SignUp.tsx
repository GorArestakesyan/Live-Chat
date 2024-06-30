import {ThemeContext} from '@screens/navigation/Navigation';
import {IGlobalState} from '@src/core/types';
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
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../core/api';
import {useGlobalState} from '../../core/global';
import utils from '../../core/utils';
import {BEHAVIOR} from '../../utils/constants';

const SignUpScreen = ({navigation}: any) => {
  const [userNameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [retryPasswordError, setRetryPasswordError] = useState('');

  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [retryPassword, setRetryPassword] = useState('');

  const {colors} = useContext(ThemeContext);

  const goToSignIn = () => navigation.navigate('SignIn');
  const login = useGlobalState((state: IGlobalState) => state.login);

  const handleSubmit = () => {
    const failedUserName = !userName || userName.length < 5;
    const failedFirstName = !firstName;
    const failedLastName = !lastName;
    const failedPassword = !password || password.length < 8;
    const failedRetryPassword = password !== retryPassword;

    setUsernameError(failedUserName ? 'Username must be >= 5 characters' : '');
    setFirstNameError(failedFirstName ? 'First name was not provided' : '');
    setLastNameError(failedLastName ? 'Last name was not provided' : '');
    setPasswordError(failedPassword ? 'Password is to short' : '');
    setRetryPasswordError(failedRetryPassword ? "Passwords don't match" : '');

    if (
      failedUserName ||
      failedFirstName ||
      failedLastName ||
      failedPassword ||
      failedRetryPassword
    ) {
      return;
    }
    api({
      method: 'POST',
      url: '/chat/signup/',
      data: {
        username: userName,
        first_name: firstName,
        last_name: lastName,
        password: password,
      },
    })
      .then(response => {
        utils.log('SIGN UP : ', response.data.user);
        const credentials = {
          username: userName,
          password,
        };

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeyboardAvoidingView behavior={BEHAVIOR} style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={[
              styles.signUpWrapper,
              {backgroundColor: colors.background},
            ]}>
            <Text style={[styles.signUpText, {color: colors.primaryText}]}>
              Sign Up
            </Text>
            <Input
              title="Username"
              value={userName}
              error={userNameError}
              onChange={setUsername}
              setError={setUsernameError}
            />
            <Input
              value={firstName}
              title="First name"
              error={firstNameError}
              onChange={setFirstName}
              setError={setFirstNameError}
            />
            <Input
              title="Last name"
              value={lastName}
              error={lastNameError}
              onChange={setLastName}
              setError={setLastNameError}
            />
            <Input
              title="Password"
              value={password}
              isPassword={true}
              error={passwordError}
              onChange={setPassword}
              setError={setPasswordError}
            />
            <Input
              title="Retype Password"
              value={retryPassword}
              isPassword={true}
              error={retryPasswordError}
              onChange={setRetryPassword}
              setError={setRetryPasswordError}
            />
            <Button title="Sign Up" onPress={handleSubmit} />
            <Text style={[styles.getAccText, {color: colors.primaryText}]}>
              Already have an account?{' '}
              <Text style={styles.signUp} onPress={goToSignIn}>
                Sign In
              </Text>
            </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  signUpWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  signUpText: {
    fontFamily: 'LeckerliOne-Regular',
    textAlign: 'center',
    marginBottom: 25,
    fontSize: 50,
    fontWeight: 'bold',
  },
  getAccText: {
    textAlign: 'center',
    marginTop: 40,
  },
  signUp: {
    color: 'blue',
  },
});
