import Expense from '@/models/expense';
import { ExpenseType } from '@/types';
import { Request, Response } from 'express';

type RequestQuery = { expenseId: string };

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json({ expenses });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong, check provided data' });
  }
};

export const getExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.query as RequestQuery;
    const expense = await Expense.findByPk(expenseId);
    if (!expense) throw new Error();
    res.status(200).json(expense);
  } catch {
    res.status(400).json({ message: 'Something went wrong, check provided data' });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  try {
    const { description, amount, date } = req.body as ExpenseType;

    const newExpense = await req.user.createExpense({ description, amount, date });
    if (!newExpense) throw new Error();
    res.status(201).json({ message: 'Expense created', newExpense });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong, check provided data' });
  }
};

export const editExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.query as RequestQuery;
    const { description, amount, date } = req.body as ExpenseType;

    if (!description || !amount || !date) throw new Error();

    const editedExpense = await req.user
      .getExpenses({ where: { id: expenseId } })
      .then((expenses) => {
        if (!expenses) throw new Error();
        const [expense] = expenses;
        expense.description = description;
        expense.amount = amount;
        expense.date = date;
        return expense;
      })
      .then((expense) => {
        return expense?.save();
      });

    return res.status(200).json({ message: 'Expense update', editedExpense });
  } catch (err) {
    return res.status(400).json({ message: 'Something went wrong, check provided data' });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.query as RequestQuery;
    await Expense.findByPk(expenseId).then((expense) => {
      if (!expense) throw new Error();
      return expense.destroy();
    });
    return res.status(204).json();
  } catch {
    return res.status(400).json({ message: 'Something went wrong, check provided data' });
  }
};
