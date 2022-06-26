import express from 'express';
import expenseRouter from '@/routes/expenses';
import bodyParser from 'body-parser';

function createServer() {
  const app = express();

  app.use(bodyParser.json());

  app.use('/api/v1', expenseRouter);

  return app;
}

export default createServer;
