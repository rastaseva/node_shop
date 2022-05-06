import { NextFunction, Request, Response } from 'express';

import verifyEmailController from '../verifyEmail.controller';

import { AUTH_SOMETHING_WENT_WRONG } from '../../../consts/auth.const';

const verifyEmailMock = jest.fn();
jest.mock('../../../services/auth.service', () => ({
  verifyEmail: () => verifyEmailMock(),
}));

let mockResponse: Partial<Response>;
const next: NextFunction = jest
  .fn()
  .mockImplementation((...args) => args.length);

beforeEach(() => {
  mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
});

describe('controller works', () => {
  const message = 'message';
  const token = 'token';

  test('should call next if error occurs', async () => {
    const req = {};

    await verifyEmailController(req as Request, mockResponse as Response, next);

    expect(next).toReturnWith(1);
  });

  test('should handle invalid token', async () => {
    verifyEmailMock.mockReturnValueOnce({ success: false, message });
    const req = { params: { token } };
    const jsonCall = {
      message,
    };

    await verifyEmailController(req as any, mockResponse as Response, next);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(jsonCall);
  });

  test('should handle valid token', async () => {
    verifyEmailMock.mockReturnValueOnce({ success: true, message });
    const req = { params: { token } };
    const jsonCall = {
      message,
    };

    await verifyEmailController(req as any, mockResponse as Response, next);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(jsonCall);
  });
});
