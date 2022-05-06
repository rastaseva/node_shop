import { NextFunction, Request, Response } from 'express';

import refreshTokenController from '../refreshToken.cotroller';

const aToken = 'jwt access token';
const rToken = 'jwt refresh token';
const tokens = { accessToken: aToken, refreshToken: rToken };

const refreshTokenMock = jest.fn();

jest.mock('../../services/token.services/refreshToken.service', () => ({
  refreshToken: () => refreshTokenMock(),
}));

let mockResponse: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
  };
  next = jest.fn().mockImplementation((...args) => args.length);
});

describe('refreshTokenController', () => {
  describe('Should 200', () => {
    refreshTokenMock.mockReturnValue({ ...tokens });
    const req = {
      cookies: { refreshToken: rToken },
    };
    const jsonCall = {
      accessToken: aToken,
    };

    test('should call correct status', async () => {
      await refreshTokenController(
        req as Request,
        mockResponse as Response,
        next
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
    test('should call correct json', async () => {
      await refreshTokenController(
        req as Request,
        mockResponse as Response,
        next
      );
      expect(mockResponse.json).toHaveBeenCalledWith(jsonCall);
    });
  });
  describe('Should 400 if refreshToken was not found in cookies', () => {
    const req = {
      cookies: {},
    };

    test('should call next on error', async () => {
      await refreshTokenController(
        req as Request,
        mockResponse as Response,
        next
      );
      expect(next).toHaveReturnedWith(1);
    });
  });
});
