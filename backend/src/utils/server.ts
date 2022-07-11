import express, { NextFunction, Request, Response } from 'express';
import expenseRouter from '@/routes/expenses';
import bodyParser from 'body-parser';

import { User } from '@/models';

const userMiddlewear = (req: Request, res: Response, next: NextFunction) => {
  User.findByPk(1)
    .then((user) => {
      if (user) {
        req.user = user;
      }
      next();
    })
    .catch((err) => console.log(err));
};

function createServer() {
  const app = express();

  app.use(bodyParser.json());

  app.use(userMiddlewear);

  app.use('/api/v1', expenseRouter);

  return app;
}

export default createServer;
