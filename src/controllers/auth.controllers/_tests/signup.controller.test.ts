import { NextFunction, Request, Response } from 'express';

import signupController from '../signup.controller';

import {
  AUTH_SIGNUP_EMAIL_USED,
  AUTH_SIGNUP_SUCCESS,
} from '../../../consts/auth.const';
import { EMAILER_INVALID_EMAIL } from '../../../consts/emailer.const';
import { SOMETHING_WENT_WRONG } from '../../../consts/general.const';

const errorMessage = 'error';
const jwtToken = 'jwt token';
const verifyToken = 'verify token';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => jwtToken),
}));

const signupMock = jest.fn();
const getAuthStatusMock = jest.fn();
jest.mock('../../../services/auth.service', () => ({
  signup: () => signupMock(),
  login: () => getAuthStatusMock(),
}));

const sendMock = jest.fn();
const validateEmailMock = jest.fn();
jest.mock('../../../services/emailer.service', () => ({
  sendEmail: () => sendMock(),
  validateEmail: () => validateEmailMock(),
}));

let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  next = jest.fn().mockReturnThis();
});

describe('signupController', () => {
  const req = {
    body: {
      email: 'e@mail.com',
      password: 'password',
    },
  };

  test('Should handle a valid request', async () => {
    signupMock.mockReturnValueOnce({ ...req.body, verifyToken });
    sendMock.mockReturnValueOnce({ accepted: [req.body.email] });
    const jsonCall = {
      message: AUTH_SIGNUP_SUCCESS,
    };
    validateEmailMock.mockReturnValueOnce(true);

    await signupController(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(jsonCall);
  });

  test('Should handle an error', async () => {
    const error = new Error(errorMessage);

    validateEmailMock.mockImplementationOnce(() => {
      throw error;
    });

    await signupController(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  test('Should handle emailer service failure', async () => {
    validateEmailMock.mockReturnValueOnce(true);
    signupMock.mockReturnValueOnce({ ...req.body, verifyToken });
    sendMock.mockReturnValueOnce({ accepted: [] });

    await signupController(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });

  test('should throw RequestRejection with correct status and message if email validators failed', async () => {
    validateEmailMock.mockReturnValueOnce(null);

    const correctStatus = 500;
    const correctMessage = SOMETHING_WENT_WRONG;

    await signupController(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: correctStatus,
        message: correctMessage,
      })
    );
  });

  test('should throw RequestRejection with correct status and message if email is not valid', async () => {
    validateEmailMock.mockReturnValueOnce(false);

    const correctStatus = 422;
    const correctMessage = EMAILER_INVALID_EMAIL;

    await signupController(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: correctStatus,
        message: correctMessage,
      })
    );
  });

  test('should throw RequestRejection with correct status and message on auth signup rejection', async () => {
    validateEmailMock.mockReturnValueOnce(true);
    signupMock.mockReturnValueOnce(null);

    const correctStatus = 409;
    const correctMessage = AUTH_SIGNUP_EMAIL_USED;

    await signupController(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: correctStatus,
        message: correctMessage,
      })
    );
  });
});
