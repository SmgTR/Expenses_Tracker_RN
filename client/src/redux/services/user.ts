import { UserTypeInputs } from '@/types';
import { setAuthenticationState, setUser } from '../slices/user-slice';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = (user: UserTypeInputs) => async (dispatch: any) => {
  await axios
    .post('http://127.0.0.1:3000/api/v1/user/login', user)
    .then(({ data }) => {
      if (!data.token) throw new Error();
      AsyncStorage.setItem('token', data.token);
      dispatch(setUser(data));
      dispatch(setAuthenticationState({ isAuthenticated: true }));
    })
    .catch(() => {
      dispatch(setAuthenticationState({ isAuthenticated: false }));
    });
};
