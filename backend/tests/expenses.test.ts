import createServer from '@/utils/server';
import supertest from 'supertest';

const app = createServer();

describe('Manage expenses', () => {
  describe('Get expense', () => {
    test('Send all expenses', async () => {
      await supertest(app).get('/api/v1/expenses').expect(200);
    });
  });
});
