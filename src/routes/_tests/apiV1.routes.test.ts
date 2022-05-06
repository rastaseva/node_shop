import express from 'express';
import request from 'supertest';

import apiV1 from '../apiV1.routes';

const app = express();
app.use('/', apiV1);

describe('apiV1 router', () => {
  test('should response with Hello api v1 text on / get request', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello api v1');
  });
});
