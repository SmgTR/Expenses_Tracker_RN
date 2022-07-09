import { createSlice } from '@reduxjs/toolkit';

import { Expense } from '@/types';

const initialState: Expense[] = [];

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, { payload }) => {
      state.push(payload);
    },

    allExpenses: (state, { payload }) => {
      if ([...state] !== [...payload.expenses]) {
        state.push(...payload.expenses);
      }
    },
    updateExpense: (state, { payload }) => {
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      state[updatableExpenseIndex] = { ...updatableExpense, ...payload };
    },
    deleteExpense: (state, { payload }) => {
      return state.filter((expense) => expense.id !== payload);
    }
  }
});

export const { addExpense, updateExpense, deleteExpense, allExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
