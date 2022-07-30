import { View, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useAppDispatch } from '@/redux/hooks';
import { UserTypeInputs } from '@/types';
import { loginUser } from '@/redux/services/user';
import { GlobalStyles } from '@/Constants/styles';

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState({
    email: {
      value: '',
      isValid: true
    },
    password: {
      value: '',
      isValid: true
    }
  });

  const inputChangeHandler = (value: string, key: string) => {
    setUserData((state) => ({ ...state, ...{ [key]: { value, isValid: true } } }));
  };

  const onSubmit = async (user: UserTypeInputs) => {
    await dispatch(loginUser(user));
  };

  const submitHandler = () => {
    const user = {
      email: userData.email.value,
      password: userData.password.value
    };

    const emailIsValid =
      userData.email.value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) && !!(userData.email.value.length > 0);

    const passwordIsValid = !!(userData.password.value.length > 0);

    if (!emailIsValid || !passwordIsValid) {
      setUserData((curInputs) => {
        return {
          email: { value: curInputs.email.value, isValid: emailIsValid ?? false },
          password: { value: curInputs.password.value, isValid: passwordIsValid ?? false }
        };
      });
      return;
    }

    onSubmit(user);
  };

  const formIsInvalid = !userData.email.isValid || !userData.password.isValid;

  return (
    <View>
      {formIsInvalid && (
        <Text style={styles.errorText}>
          <Text>Invalid input values- please check your inputs</Text>
        </Text>
      )}
      <Input
        label="Email"
        invalid={!userData.email.isValid}
        testID="loginEmail"
        textInputConfig={{
          onChangeText: (value) => inputChangeHandler(value, 'email'),
          value: userData.email.value,
          keyboardType: 'email-address',
          autoCorrect: false,
          autoComplete: 'email',
          autoCapitalize: 'none'
        }}
      ></Input>
      <Input
        label="Password"
        invalid={!userData.password.isValid}
        testID="loginPassword"
        textInputConfig={{
          onChangeText: (value) => inputChangeHandler(value, 'password'),
          secureTextEntry: true,
          autoCapitalize: 'none',
          autoCorrect: false
        }}
      ></Input>
      <Button style={styles.button} onPress={submitHandler} testID={'loginButton'}>
        {'Log In'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  }
});

export default LoginForm;
