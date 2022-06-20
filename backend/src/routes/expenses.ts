import { Expense } from '@/types';
import { Router } from 'express';

const expenses: Expense[] = [{ amount: 4, description: '', date: new Date() }];

const router = Router();

type RequestParams = { expenseId: string };

router.get('/expense', (req, res) => {
  res.status(200).json({ expenses });
});

router.post('/expense', (req, res) => {
  const newExpense: Expense = {
    amount: req.body.amount,
    description: req.body.description,
    date: req.body.date
  };
  res.status(200).json(newExpense);
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
