import { generateJWT } from '@/auth/jwtStrategy';
import createServer from '@/utils/server';
import supertest from 'supertest';

import { dummyUserInput, dummyUser } from './testsData';

const app = createServer();

jest.mock('bcrypt');

describe('Manage user', () => {
  test('Create user', async () => {
    await supertest(app).post('/api/v1/user/create').send(dummyUserInput).expect(200);
  });

  test('Login user', async () => {
    await supertest(app).post('/api/v1/user/login').send(dummyUserInput).expect(200);
  });
});
