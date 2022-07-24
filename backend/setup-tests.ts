import dotenv from 'dotenv';

import { User } from '@/models';
import Expense from '@/models/expense';

import { dummyExpense, dummyUser, editedExpense } from './tests/testsData';

dotenv.config({ path: '.env.test' });

jest.mock('@/models/user', () => ({
  findAll: jest.fn().mockImplementation(() => Promise.resolve(User)),
  findByPk: jest.fn().mockImplementation(() => Promise.resolve(User)),
  create: jest.fn().mockImplementation(({ email, password }) => {
    if (!email || !password) {
      throw new Error();
    } else {
      return dummyUser;
    }
  }),
  findOne: jest.fn().mockImplementation(() => Promise.resolve(User)),
  destroy: jest.fn(),
  save: jest.fn().mockImplementation(() => {
    Promise.resolve(User);
  }),
  getExpenses: jest.fn().mockImplementation(async () => {
    return await Promise.resolve(User).then(() => {
      return [dummyExpense];
    });
  }),
  createExpense: jest.fn().mockImplementation(({ amount, description, date }) => {
    if (!amount || !description || !date) {
      throw new Error();
    } else {
      return dummyExpense;
    }
  })
}));

jest.mock('@/models/expense', () => ({
  findAll: jest.fn(),
  create: jest.fn().mockImplementation(({ amount, description, date }) => {
    if (!amount || !description || !date) {
      throw new Error();
    } else {
      return dummyExpense;
    }
  }),
  findByPk: jest.fn().mockImplementation(() => Promise.resolve(Expense)),
  save: jest.fn().mockImplementation(() => {
    Promise.resolve(editedExpense);
  }),
  destroy: jest.fn()
}));
