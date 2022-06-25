import 'dotenv/config';

import express from 'express';

import bodyParser from 'body-parser';

import expenseRouter from '@/routes/expenses';

const app = express();

app.use('/api/v1', expenseRouter);

app.use(bodyParser.json());

app.listen(3000);
