import createServer from '@/utils/server';
import supertest from 'supertest';

const dummyExpense = {
  description: 'Macbook Pro 244',
  amount: 233.4,
  date: new Date()
};

jest.mock('@/models/expense', () => ({
  findAll: jest.fn(),
  create: jest.fn().mockImplementation(({ amount, description, date }) => {
    if (!amount || !description || !date) {
      throw new Error();
    }
  })
}));

const app = createServer();

describe('Manage expenses', () => {
  describe('Get expense', () => {
    test('Send all expenses', async () => {
      await supertest(app).get('/api/v1/expenses').expect(200);
    });
  });
  describe('Create expense', () => {
    test('Create new expense', async () => {
      await supertest(app)
        .post('/api/v1/expense')
        .send({ ...dummyExpense })
        .expect(200);
    });

    test('New expense should fail if payload data is not provided', async () => {
      const bodyData = [{ description: 'description' }, { amount: 20 }, { date: '2022-06-12' }, {}];

      for (const body of bodyData) {
        const response = await supertest(app).post('/api/v1/expense').send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
