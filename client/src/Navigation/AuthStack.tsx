import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from '@/Constants/styles';

const Stack = createNativeStackNavigator();

import { Login, SignUp } from '@/Screens';

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500
        },
        headerShown: false,
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 }
      }}
    >
      <Stack.Screen name="Log In" component={Login} />
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  );
}
