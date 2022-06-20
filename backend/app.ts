import express from 'express';

import bodyParser from 'body-parser';

import expenseRouter from '@/routes/expenses';

const app = express();

app.use(bodyParser.json());

app.use(expenseRouter);

app.listen(3000);
