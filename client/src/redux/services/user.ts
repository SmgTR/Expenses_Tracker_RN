import { UserTypeInputs } from '@/types';
import { setAuthenticationState, setUser } from '../slices/user-slice';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_URL } from '@env';

export const loginUser = (user: UserTypeInputs) => async (dispatch: any) => {
  await axios
    .post(`${BASE_URL}/api/v1/user/login`, user)
    .then(({ data }) => {
      if (!data.token) throw new Error();
      AsyncStorage.setItem('token', data.token);

      dispatch(setUser(data));
      dispatch(setAuthenticationState({ isAuthenticated: true }));
    })
    .catch((err) => {
      console.log(err);
      dispatch(setAuthenticationState({ isAuthenticated: false }));
    });
};
