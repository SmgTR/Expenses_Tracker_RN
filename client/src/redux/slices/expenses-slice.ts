import { createSlice } from '@reduxjs/toolkit';

import { Expense } from '@/types/Expense';

const DUMMY_EXPENSES: Expense[] = [
  { id: 'e1', description: 'A pair of shoes', amount: 59.99, date: 'Sat Jun 18 2022' },
  { id: 'e2', description: 'Bananas', amount: 39.29, date: 'Saturday, 18 June 2022 05:44:30' },
  { id: 'e3', description: 'Book', amount: 12.42, date: 'Saturday, 18 June 2022 05:44:30' },
  { id: 'e4', description: 'Lightsaber', amount: 145.55, date: 'Saturday, 18 June 2022 05:44:30' },
  { id: 'e5', description: 'Lego', amount: 421.12, date: 'Saturday, 18 June 2022 05:44:30' },
  { id: 'e6', description: 'Coconut', amount: 16.21, date: 'Saturday, 18 June 2022 05:44:30' },
  { id: 'e7', description: 'Iphone', amount: 369.12, date: 'Saturday, 18 June 2022 05:44:30' },
  { id: 'e8', description: 'TV', amount: 4221.86, date: 'Saturday, 18 June 2022 05:44:30' },
  {
    id: 'e9',
    description: 'Star Trek Movie',
    amount: 9.23,
    date: 'Saturday, 18 June 2022 05:44:30'
  },
  {
    id: 'e10',
    description: 'Chewbacca Cosplay Suit',
    amount: 421.12,
    date: 'Saturday, 18 June 2022 05:44:30'
  }
];

const initialState: Expense[] = [];

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, { payload }) => {
      state.push(payload);
    },
    updateExpense: (state, { payload }) => {
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      state[updatableExpenseIndex] = { ...updatableExpense, ...payload.expenseChanges };
    },
    deleteExpense: (state, { payload }) => {
      return state.filter((expense) => expense.id !== payload.expenseId);
    }
  }
});

export const { addExpense, updateExpense, deleteExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
