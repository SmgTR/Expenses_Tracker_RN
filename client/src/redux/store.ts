import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './slices/expenses-slice';
import userReducer from './slices/user-slice';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
