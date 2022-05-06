import express, { NextFunction, Request, Response } from 'express';
import request from 'supertest';

import userRouter from '../user.routes';

const app = express();
app.use('/', userRouter);

const createUser = 'createUser controller';
const getUsers = 'find all users controller';

jest.mock('../../../middleware/auth.middleware', () => ({
  authCheck: jest.fn((req: Request, res: Response, next: NextFunction) =>
    next()
  ),
  roleCheck: jest.fn(
    (rolesArray: string[]) =>
      (req: Request, res: Response, next: NextFunction) =>
        next()
  ),
}));

jest.mock('../../../controllers/user.controller', () => ({
  createUser: jest.fn((req: Request, res: Response) => res.send(createUser)),
  getUsers: jest.fn((req: Request, res: Response) => res.send(getUsers)),
}));

describe('user router', () => {
  test('should trigger userController.createUser on /data/define post request', async () => {
    const response = await request(app).post('/define');

    expect(response.text).toBe(createUser);
  });
  test('should trigger userController.getUsers on / get request', async () => {
    const response = await request(app).get('/');

    expect(response.text).toBe(getUsers);
  });
});
