import express from 'express';
import request from 'supertest';

import notFoundRouter from '../404';

describe('Not found route middleware', () => {
  const app = express();
  app.use('/', notFoundRouter);

  test('responds to /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: 'Page not found' });
  });
});
