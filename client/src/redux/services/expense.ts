import { allExpenses, addExpense } from '../slices/expenses-slice';
import { Expense, ExpenseInputsType } from '@/types';
import axios from 'axios';

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
      dispatch(addExpense(data.expense));
    })
    .catch((err) => console.log(err));
};
