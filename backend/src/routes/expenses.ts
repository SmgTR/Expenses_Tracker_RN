import { addExpense, getAllExpenses } from '@/controllers/expensesController';
import { ExpenseType } from '@/types';
import { Router } from 'express';

const router = Router();

type RequestParams = { expenseId: string };

router.get('/expenses', async (req, res) => {
  try {
    const expenses = await getAllExpenses();
    res.status(200).json({ expenses });
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
    console.log(err);
  }
});

router.put('/expense/:expenseId', (req, res) => {
  const params = req.params as RequestParams;
  req.params.expenseId;
  console.log(params.expenseId);
  res.status(200).json('update');
});

router.delete('/expense/:expenseId', (req, res) => {
  const params = req.params as RequestParams;
  res.status(200).json({ message: 'deleted' });
});

export default router;
