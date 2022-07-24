import express from 'express';
import expenseRouter from '@/routes/expenses';
import userRouter from '@/routes/users';
import bodyParser from 'body-parser';

import { strategy } from '@/auth/passport';

import passport from 'passport';

function createServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(passport.initialize());

  passport.use(strategy);

  app.use('/api/v1', userRouter);

  app.use('/api/v1', expenseRouter);

  return app;
}

export default createServer;
