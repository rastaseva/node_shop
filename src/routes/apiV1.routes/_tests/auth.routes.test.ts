import express, { NextFunction, Request, Response } from 'express';
import request from 'supertest';

import authRouter from '../auth.routes';

const app = express();
app.use('/', authRouter);

const signup = 'signup controller';
const login = 'login controller';
const verify = 'verify controller';
const recover = 'recover controller';
const resetPassword = 'reset password controller';

jest.mock('../../../middleware/auth.middleware', () => ({
  signup: jest.fn((req: Request, res: Response, next: NextFunction) => next()),
  login: jest.fn((req: Request, res: Response, next: NextFunction) => next()),
  recover: jest.fn((req: Request, res: Response, next: NextFunction) => next()),
  resetPassword: jest.fn((req: Request, res: Response, next: NextFunction) =>
    next()
  ),
}));

jest.mock('../../../controllers/auth.controller', () => ({
  signup: jest.fn((req: Request, res: Response) => res.send(signup)),
  login: jest.fn((req: Request, res: Response) => res.send(login)),
  verifyEmail: jest.fn((req: Request, res: Response) => res.send(verify)),
  recover: jest.fn((req: Request, res: Response) => res.send(recover)),
  resetPassword: jest.fn((req: Request, res: Response) =>
    res.send(resetPassword)
  ),
}));

describe('authRouter', () => {
  test('should trigger authController.signup on /signup post request', async () => {
    const response = await request(app).post('/signup');

    expect(response.text).toBe(signup);
  });
  test('should trigger authController.login on /login post request', async () => {
    const response = await request(app).post('/login');

    expect(response.text).toBe(login);
  });
  test('should trigger authController.verify on /verify/token get request', async () => {
    const response = await request(app).get('/verify/token');

    expect(response.text).toBe(verify);
  });

  test('should trigger authController.recover on /recover post request', async () => {
    const response = await request(app).post('/recover');

    expect(response.text).toBe(recover);
  });

  test('should trigger authController.resetPassword on /recover/token post request', async () => {
    const response = await request(app).post('/recover/token');

    expect(response.text).toBe(resetPassword);
  });
});
