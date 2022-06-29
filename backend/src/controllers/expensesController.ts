import Expense from '@/models/expense';
import { ExpenseType } from '@/types';

export const getAllExpenses = () => {
  console.log('placeholder');
};

export const addExpense = async ({ description, amount, date }: ExpenseType) => {
  const newProduct = await Expense.create({ description, amount, date });
  return newProduct;
};
