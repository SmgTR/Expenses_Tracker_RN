import { generateJWT } from '@/auth/jwtStrategy';

import createServer from '@/utils/server';
import supertest from 'supertest';

import { dummyUser, dummyExpense } from './testsData';

const app = createServer();

describe('Manage expenses', () => {
  let userToken: any;
  beforeEach(() => {
    userToken = generateJWT(dummyUser.email, dummyUser.id);
  });

  describe('Get expense', () => {
    test('Send all expenses', async () => {
      await supertest(app)
        .get('/api/v1/expenses')
        .set('Authorization', 'Bearer ' + userToken)
        .expect(200);
    });
  });
  describe('Create expense', () => {
    test('Create new expense', async () => {
      const expense = await supertest(app)
        .post('/api/v1/expense')
        .set('Authorization', 'Bearer ' + userToken)
        .send(dummyExpense);
      expect(expense.statusCode).toBe(201);
    });

    test('New expense should fail if payload data is not provided', async () => {
      const bodyData = [{ description: 'description' }, { amount: 20 }, { date: '2022-06-12' }, {}];

      for (const body of bodyData) {
        const response = await supertest(app)
          .post('/api/v1/expense')
          .set('Authorization', 'bearer ' + userToken)
          .send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
  describe('Edit expense', () => {
    test('Edit expense with correct data', async () => {
      await supertest(app)
        .put('/api/v1/expense?expenseId=5')
        .set('Authorization', 'Bearer ' + userToken)
        .send({ ...dummyExpense })
        .expect(200);
    });

    test('Editing fails if incorrect data', async () => {
      const bodyData = [{ description: 'description' }, { amount: 20 }, { date: '2022-06-12' }, {}];
      for (const body of bodyData) {
        const response = await supertest(app)
          .put('/api/v1/expense')
          .set('Authorization', 'Bearer ' + userToken)
          .send(body);
        expect(response.statusCode).toBe(400);
      }
    });

    test('It saves edited data', async () => {
      const response = await supertest(app)
        .put('/api/v1/expense?expenseId=5')
        .set('Authorization', 'Bearer ' + userToken)
        .send({ ...dummyExpense });
      expect(response.body.editedExpense.description).toMatch(/california trip/i);
    });
  });
  describe('Delete expense', () => {
    test('It deletes expense item', async () => {
      const response = await supertest(app)
        .delete('/api/v1/expense?expenseId=5')
        .set('Authorization', 'Bearer ' + userToken);
      expect(response.statusCode).toBe(204);
    });
  });
});
