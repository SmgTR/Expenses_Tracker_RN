import {
  addExpense,
  deleteExpense,
  editExpense,
  getAllExpenses,
  getExpense
} from '@/controllers/expensesController';

import passport from 'passport';

import { Router } from 'express';

const router = Router();

router.use(passport.authenticate('jwt', { session: false }));
router.get('/expenses', getAllExpenses);
router
  .get('/expense', getExpense)
  .post('/expense', addExpense)
  .put('/expense', editExpense)
  .delete('/expense', deleteExpense);

export default router;
