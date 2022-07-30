import {
  View,
  StyleSheet,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text
} from 'react-native';

import { GlobalStyles } from '@/Constants/styles';

import LoginImg from '@/Assets/loginIcon.svg';
import LoginForm from '@/Components/Auth/LoginForm';
import { ScrollView } from 'react-native-gesture-handler';

const Login = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={styles.loginContent}>
        <Text style={styles.header}>Log In</Text>

        <LoginImg style={styles.imageItem} />

        <LoginForm />
        <View style={{ flex: 0.5 }}></View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginContent: {
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: GlobalStyles.colors.primary800,
    paddingHorizontal: 20
  },

  header: {
    fontSize: 24,
    textAlign: 'center',
    color: GlobalStyles.colors.primary100
  },
  imageItem: {
    height: '50%',
    width: '20%',
    marginVertical: 20
  }
});

export default Login;
