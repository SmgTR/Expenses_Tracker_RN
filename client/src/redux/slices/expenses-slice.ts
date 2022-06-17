import { createSlice } from '@reduxjs/toolkit';

import { Expense } from '@/types/Expense';

const DUMMY_EXPENSES: Expense[] = [
  { id: 'e1', description: 'A pair of shoes', amount: 59.99, date: new Date('2021-12-19') },
  { id: 'e2', description: 'Bananas', amount: 39.29, date: new Date('2022-06-08') },
  { id: 'e3', description: 'Book', amount: 12.42, date: new Date('2022-06-07') },
  { id: 'e4', description: 'Lightsaber', amount: 145.55, date: new Date('2022-05-21') },
  { id: 'e5', description: 'Lego', amount: 421.12, date: new Date('2022-06-10') },
  { id: 'e6', description: 'Coconut', amount: 16.21, date: new Date('2022-06-10') },
  { id: 'e7', description: 'Iphone', amount: 369.12, date: new Date('2022-06-10') },
  { id: 'e8', description: 'TV', amount: 4221.86, date: new Date('2022-06-10') },
  { id: 'e9', description: 'Star Trek Movie', amount: 9.23, date: new Date('2022-06-10') },
  { id: 'e10', description: 'Chewbacca Cosplay Suit', amount: 421.12, date: new Date('2022-06-10') }
];

const initialState = {
  expenses: DUMMY_EXPENSES
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, { payload }) => {
      state.expenses.push(payload);
    },
    updateExpense: (state, { payload }) => {
      const expenseItem = state.expenses.findIndex((expense) => expense.id === payload.id);
      state.expenses[expenseItem] = { expenseItem, ...payload };
    },
    deleteExpense: (state, { payload }) => {
      state.expenses.filter((expense) => expense.id !== payload);
    }
  }
});

export const { addExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
