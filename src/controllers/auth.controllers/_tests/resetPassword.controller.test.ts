import { NextFunction, Request, Response } from 'express';

import {
  AUTH_PASSWORD_CHANGED,
  AUTH_RECOVERY_INVALID_TOKEN,
} from '../../../consts/auth.const';
import resetPasswordController from '../resetPassword.controller';

const findOneMock = jest.fn();

jest.mock('../../../models/user.model', () => ({
  findOne: () => findOneMock(),
}));

const hashMock = jest.fn();

jest.mock('bcrypt', () => ({
  hash: () => hashMock(),
}));

let res: Partial<Response>;
const next: NextFunction = jest
  .fn()
  .mockImplementation((...args) => args.length);

beforeEach(() => {
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
});

describe('controller works', () => {
  const password = 'password';
  const token = 'token';
  const error = new Error();
  const req = {
    params: {
      token,
    },
    body: {
      password,
    },
  };

  const user = {
    save: () => {},
  };

  test('should respond with correct status and json if all good', async () => {
    findOneMock.mockImplementationOnce(() => user);

    await resetPasswordController(req as any, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: AUTH_PASSWORD_CHANGED });
  });

  test('should throw RequestRejection with correct status and message if no user found', async () => {
    findOneMock.mockImplementationOnce(() => null);
    const correctStatus = 400;
    const correctMessage = AUTH_RECOVERY_INVALID_TOKEN;

    await resetPasswordController(req as any, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: correctStatus,
        message: correctMessage,
      })
    );
  });

  test('should pass error into next if error occurs', async () => {
    findOneMock.mockImplementationOnce(() => {
      throw error;
    });

    await resetPasswordController(req as any, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
