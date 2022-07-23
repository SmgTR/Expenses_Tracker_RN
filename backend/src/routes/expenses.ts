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

router.get('/expenses', getAllExpenses);

router
  .get('/expense', passport.authenticate('jwt', { session: false }), getExpense)
  .post('/expense', passport.authenticate('jwt', { session: false }), addExpense)
  .put('/expense', passport.authenticate('jwt', { session: false }), editExpense)
  .delete('/expense', passport.authenticate('jwt', { session: false }), deleteExpense);

export default router;
