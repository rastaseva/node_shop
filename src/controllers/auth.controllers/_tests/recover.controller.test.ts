import { NextFunction, Request, Response } from 'express';

import {
  AUTH_RECOVERY_FAILURE,
  AUTH_RECOVERY_SUCCESS,
} from '../../../consts/auth.const';
import { USER_NOT_FOUND } from '../../../consts/user.const';
import recoverController from '../recover.controller';

const findOneMock = jest.fn();

jest.mock('../../../models/user.model', () => ({
  findOne: () => findOneMock(),
}));

let getRecoverTokenMock = jest.fn();

jest.mock('../../../services/auth.service', () => ({
  getRecoverToken: () => getRecoverTokenMock(),
}));

let sendEmailMock = jest.fn();

jest.mock('../../../services/emailer.service', () => ({
  sendEmail: () => sendEmailMock(),
}));

jest.mock('config', () => ({
  get: jest.fn(() => 5000),
}));

let res: Partial<Response>;

let next: NextFunction;

beforeEach(() => {
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  sendEmailMock = jest.fn();
  getRecoverTokenMock = jest.fn();
  next = jest.fn().mockImplementation((...args) => args.length);
});

describe('controller works', () => {
  const error = new Error();
  const email = 'e@mail.com';
  const req = {
    body: {
      email,
    },
  };

  const getUser = (isActive: boolean) => ({
    isActive,
    save: () => {},
  });

  test('should respond with correct status and json if all good', async () => {
    const correctStatus = 200;
    const correctJson = { message: AUTH_RECOVERY_SUCCESS };
    findOneMock.mockImplementation(() => getUser(true));
    sendEmailMock.mockImplementation(() => ({
      accepted: [email],
    }));

    await recoverController(req as any, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(correctStatus);
    expect(res.json).toHaveBeenCalledWith(correctJson);
  });

  test('should throw RequestRejection with correct status and message if user is not found nor active', async () => {
    const correctStatus = 400;
    const correctMessage = USER_NOT_FOUND;
    findOneMock.mockImplementation(() => getUser(false));
    sendEmailMock.mockImplementation(() => ({ accepted: [email] }));

    await recoverController(req as any, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: correctStatus,
        message: correctMessage,
      })
    );
  });

  test('should throw RequestRejection with correct status and message if email did not send', async () => {
    const correctStatus = 500;
    const correctMessage = AUTH_RECOVERY_FAILURE;
    findOneMock.mockImplementation(() => getUser(true));
    sendEmailMock.mockImplementation(() => ({ accepted: [] }));

    await recoverController(req as any, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: correctStatus,
        message: correctMessage,
      })
    );
  });

  test('should pass error into next if error occurs', async () => {
    findOneMock.mockImplementation(() => {
      throw error;
    });

    await recoverController(req as any, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
