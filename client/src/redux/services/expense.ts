import { allExpenses, addExpense, updateExpense, deleteExpense } from '../slices/expenses-slice';
import { Expense, ExpenseInputsType } from '@/types';
import axios from 'axios';
import { getFormattedDate } from '@/utils/date';

export const getAllExpenses = () => async (dispatch: any) => {
  await axios
    .get('http://127.0.0.1:3000/api/v1/expenses')
    .then(({ data }) => {
      const expensesList: Expense[] = data;
      dispatch(allExpenses(expensesList));
    })
    .catch((err) => console.log(err));
};

export const createExpense = (expense: ExpenseInputsType) => async (dispatch: any) => {
  await axios
    .post('http://127.0.0.1:3000/api/v1/expense', expense)
    .then(({ data }) => {
      dispatch(addExpense(data.newExpense));
    })
    .catch((err) => console.log(err));
};

export const editExpense = (expense: Expense) => async (dispatch: any) => {
  await axios
    .put(`http://127.0.0.1:3000/api/v1/expense?expenseId=${expense.id}`, expense)
    .then(({ data }) => {
      data.editedExpense.date = getFormattedDate(data.editedExpense.date);
      dispatch(updateExpense(data.editedExpense));
    })
    .catch((err) => console.log(err));
};

export const removeExpense = (expenseId: string) => async (dispatch: any) => {
  await axios
    .delete(`http://127.0.0.1:3000/api/v1/expense?expenseId=${expenseId}`)
    .then(() => {
      dispatch(deleteExpense(expenseId));
    })
    .catch((err) => console.log(err));
};
