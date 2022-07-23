import { User } from '@/models';
import Expense from '@/models/expense';
import createServer from '@/utils/server';
import passport from 'passport';
import supertest from 'supertest';

const dummyExpense = {
  description: 'Macbook Pro 244',
  amount: 233.4,
  date: new Date(),
  userId: 1,
  save: jest.fn().mockImplementation(() => editedExpense)
};

const dummyUser = {
  id: 1,
  email: 'test@test.pl'
};

const editedExpense = {
  description: 'California trip',
  amount: 233.4,
  date: new Date()
};

jest.mock('@/models/user', () => ({
  findAll: jest.fn().mockImplementation(() => Promise.resolve(User)),
  findByPk: jest.fn().mockImplementation(() => dummyUser),
  findOne: jest.fn().mockImplementation(() => Promise.resolve(dummyUser as User)),
  destroy: jest.fn(),
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

// passport.authenticate = jest.fn(() => {
//   return { id: 1, email: 'tester@test.pl' } as User;
// });

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

const app = createServer();
// try to get token, maybe not working cuz of unathorized
describe('Manage expenses', () => {
  describe('Get expense', () => {
    test('Send all expenses', async () => {
      await supertest(app).get('/api/v1/expenses').expect(200);
    });
  });
  describe('Create expense', () => {
    test('Create new expense', async () => {
      const expense = await supertest(app).post('/api/v1/expense').send(dummyExpense);
      expect(expense.statusCode).toBe(201);
    });

    test('New expense should fail if payload data is not provided', async () => {
      const bodyData = [{ description: 'description' }, { amount: 20 }, { date: '2022-06-12' }, {}];

      for (const body of bodyData) {
        const response = await supertest(app).post('/api/v1/expense').send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
  describe('Edit expense', () => {
    test('Edit expense with correct data', async () => {
      const response = await supertest(app)
        .put('/api/v1/expense?expenseId=5')
        .send({ ...dummyExpense })
        .expect(200);
    });

    test('Editing fails if incorrect data', async () => {
      const bodyData = [{ description: 'description' }, { amount: 20 }, { date: '2022-06-12' }, {}];
      for (const body of bodyData) {
        const response = await supertest(app).put('/api/v1/expense').send(body);
        expect(response.statusCode).toBe(400);
      }
    });

    test('It saves edited data', async () => {
      const response = await supertest(app)
        .put('/api/v1/expense?expenseId=5')
        .send({ ...dummyExpense });
      expect(response.body.editedExpense.description).toMatch(/california trip/i);
    });
  });
  describe('Delete expense', () => {
    test('It deletes expense item', async () => {
      const response = await supertest(app).delete('/api/v1/expense?expenseId=5');
      expect(response.statusCode).toBe(204);
    });
  });
});
