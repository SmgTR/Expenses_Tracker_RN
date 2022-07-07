import { addExpense, getAllExpenses, getExpense } from '@/controllers/expensesController';
import { ExpenseType } from '@/types';
import { Router } from 'express';

const router = Router();

type RequestQuery = { expenseId: string };

router.get('/expenses', async (req, res) => {
  try {
    const expenses = await getAllExpenses();
    res.status(200).json({ expenses });
  } catch (err) {
    console.log(err);
  }
});

router.get('/expense', async (req, res) => {
  const params = req.query as RequestQuery;
  try {
    const expense = await getExpense(params.expenseId);

    res.status(200).json(expense);
  } catch (err) {
    console.log(err);
  }
});

router.post('/expense', async (req, res) => {
  try {
    const params = req.body as ExpenseType;
    const expense = await addExpense(params);
    res.status(200).json({ message: 'Expense created', expense });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong, check provided data' });
  }
});

router.put('/expense/:expenseId', (req, res) => {
  const query = req.query as RequestQuery;
  req.params.expenseId;
  res.status(200).json('update');
});

router.delete('/expense/:expenseId', (req, res) => {
  const params = req.query as RequestQuery;
  res.status(200).json({ message: 'deleted' });
});

export default router;
