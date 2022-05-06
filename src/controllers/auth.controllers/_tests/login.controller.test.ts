import { NextFunction, Request, Response } from 'express';

import loginController from '../login.controller';

import { USERS_NOT_FOUND } from '../../../consts/user.const';

const accessToken = 'jwt access token';
const refreshToken = 'jwt refresh token';
const id = 1;
const role = 'batya';
const email = 'e@mail.com';
const password = 'password';
const message = 'message';
const error = 'error';

const signupMock = jest.fn();
const loginMock = jest.fn();

jest.mock('../../../services/auth.service', () => ({
  signup: () => signupMock(),
  login: () => loginMock(),
}));

const getUserDataMock = jest.fn();

jest.mock('../../../services/auth.services/login.service', () => ({
  getAuthUserData: () => getUserDataMock(),
}));

const generateTokensMock = jest.fn();
const saveTokenMock = jest.fn();

jest.mock('../../../services/token.services/token.service', () => ({
  generateTokens: () => generateTokensMock(),
  saveToken: () => saveTokenMock(),
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

describe('loginController', () => {
  describe('Everything went fine', () => {
    test('Should get 200', async () => {
      loginMock.mockReturnValueOnce({ success: true, message });
      getUserDataMock.mockReturnValueOnce({ id, role });
      generateTokensMock.mockReturnValueOnce({ accessToken, refreshToken });
      const body = { email, password };

      await loginController(
        { body } as Request,
        mockResponse as Response,
        next
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
    test('Should send json message', async () => {
      loginMock.mockReturnValueOnce({ success: true, message });
      getUserDataMock.mockReturnValueOnce({ id, role });
      generateTokensMock.mockReturnValueOnce({ accessToken, refreshToken });
      const body = { email, password };
      const jsonCall = {
        accessToken,
        message,
      };
      await loginController(
        { body } as Request,
        mockResponse as Response,
        next
      );
      expect(mockResponse.json).toHaveBeenCalledWith(jsonCall);
    });
  });

  describe('Should throw error if user was not found', () => {
    test('Should call next with RequestRejection', async () => {
      loginMock.mockReturnValueOnce({ success: true, message });
      getUserDataMock.mockReturnValueOnce(null);
      const body = { email, password };

      await loginController(
        { body } as Request,
        mockResponse as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 401,
          message: USERS_NOT_FOUND,
        })
      );
    });
  });

  describe('Should handle login fail', () => {
    test('Should get 400', async () => {
      loginMock.mockReturnValueOnce({ success: false, message });
      const body = { email, password };

      await loginController(
        { body } as Request,
        mockResponse as Response,
        next
      );
      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
    test('Should send json message', async () => {
      loginMock.mockReturnValueOnce({ success: false, message });
      const body = { email, password };
      const jsonCall = {
        message,
      };
      await loginController(
        { body } as Request,
        mockResponse as Response,
        next
      );
      expect(mockResponse.json).toHaveBeenCalledWith(jsonCall);
    });
  });

  describe('Should handle error', () => {
    test('Should call next', async () => {
      loginMock.mockImplementationOnce(() => {
        throw new Error(error);
      });
      const body = { email, password };
      await loginController(
        { body } as Request,
        mockResponse as Response,
        next
      );
      expect(next).toReturnWith(1);
    });
  });
});
