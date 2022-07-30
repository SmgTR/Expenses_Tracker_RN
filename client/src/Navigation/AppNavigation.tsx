import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from '@/utils/routes';

import { ExpensesStack } from './ExpenseStack';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { AuthStack } from './AuthStack';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthenticationState, setUser } from '@/redux/slices/user-slice';

const AppNavigation = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        dispatch(setUser({ token: storedToken }));
        dispatch(setAuthenticationState({ isAuthenticated: true }));
      }
    }

    fetchToken();
  }, [user.isAuthenticated]);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {user.isAuthenticated && user.token ? <ExpensesStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

export default AppNavigation;
