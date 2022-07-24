import { User } from '@/models';
import Expense from '@/models/expense';
import { ExpenseType } from '@/types';
import { Request, Response } from 'express';

type RequestQuery = { expenseId: string };

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const user = (await req.user) as User;
    const expenses = await Expense.findAll({ where: { userId: user.id } });
    res.status(200).json({ expenses });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong, check provided data' });
  }
};

export const getExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.query as RequestQuery;
    const user = (await req.user) as User;

    const expense = await Expense.findOne({ where: { id: expenseId, userId: user.id } });

    if (!expense) {
      return res.status(404).json({ message: 'Item does not exist' });
    }
    return res.status(200).json(expense);
  } catch {
    return res.status(400).json({ message: 'Something went wrong, check provided data' });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  try {
    const { description, amount, date } = req.body as ExpenseType;

    const user = (await req.user) as User;
    if (!user) throw new Error();
    const newExpense = await user.createExpense({ description, amount, date });
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
    const user = (await req.user) as User;
    if (!user) throw new Error();
    const editedExpense = await user
      .getExpenses({ where: { id: expenseId, userId: user.id } })
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
    const user = (await req.user) as User;
    await user.getExpenses({ where: { id: expenseId, userId: user.id } }).then((expense) => {
      if (!expense) throw new Error();
      return expense[0].destroy();
    });
    return res.status(204).json({ message: 'Item deleted' });
  } catch {
    return res.status(400).json({ message: 'Something went wrong, check provided data' });
  }
};
