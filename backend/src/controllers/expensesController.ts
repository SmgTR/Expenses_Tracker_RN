import Expense from '@/models/expense';
import { ExpenseType } from '@/types';

export const getAllExpenses = async () => {
  return await Expense.findAll();
};

export const getExpense = async (expenseId: string) => {
  return await Expense.findByPk(expenseId);
};

export const addExpense = async ({ description, amount, date }: ExpenseType) => {
  const newProduct = await Expense.create({ description, amount, date });
  return newProduct;
};
