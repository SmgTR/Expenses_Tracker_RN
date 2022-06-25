import { allExpenses } from '../slices/expenses-slice';

export const getAllExpenses = () => async (dispatch: any) => {
  const response = await fetch('http://127.0.0.1:3000/api/v1/expense');
  const data = await response.json();
  data.amount = +data.amount;
  dispatch(allExpenses(data));
};
