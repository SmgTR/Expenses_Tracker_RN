import { createSlice } from '@reduxjs/toolkit';

import { User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: User = {
  token: '',
  isAuthenticated: false,
  isLoading: true
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      return { ...state, ...payload };
    },

    loadingState: (state, { payload }) => {
      return { ...state, ...payload };
    },

    setAuthenticationState: (state, { payload }) => {
      return { ...state, ...payload };
    },

    logoutUser: (state) => {
      AsyncStorage.removeItem('token');
      return { ...state, isAuthenticated: false, token: '' };
    }
  }
});

export const { setUser, loadingState, setAuthenticationState, logoutUser } = userSlice.actions;

export default userSlice.reducer;
