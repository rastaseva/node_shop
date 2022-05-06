import express from 'express';
import request from 'supertest';
// eslint-disable-next-line sort-imports-es6-autofix/sort-imports-es6
import logout from './logout';

const app = express();
app.use('/', logout);

describe('logout endpoint', () => {
  test('should return response with Num', async () => {
    const res = await request(app).post('/4/logout');
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('Bye bye 4');
  });
  test('should return response with String', async () => {
    const res = await request(app).post('/ann/logout');
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('Bye bye ann');
  });
});
