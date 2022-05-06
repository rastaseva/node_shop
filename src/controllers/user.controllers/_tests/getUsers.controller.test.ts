import { NextFunction, Request, Response } from 'express';

import {
  USERS_NOT_FOUND,
  USERS_SEARCH_FAILURE,
  USERS_SEARCH_SUCCESS,
} from '../../../consts/user.const';
import userController from '../../user.controller';

const findAllUsersMock = jest.fn();

jest.mock('../../../services/user.service', () => ({
  getUsers: () => findAllUsersMock(),
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

describe('users controller findAllUsers request and responce', () => {
  describe('request was empty', () => {
    test('should get 200', async () => {
      findAllUsersMock.mockImplementation(() => USERS_SEARCH_SUCCESS);

      const mockRequest: Partial<Request> = {};

      await userController.getUsers(
        mockRequest as Request,
        mockResponse as Response,
        next
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    test('should notify that users were found', async () => {
      findAllUsersMock.mockImplementation(() => USERS_SEARCH_SUCCESS);

      const mockRequest: Partial<Request> = {};

      await userController.getUsers(
        mockRequest as Request,
        mockResponse as Response,
        next
      );

      expect(mockResponse.json).toHaveBeenCalledWith(USERS_SEARCH_SUCCESS);
    });
  });

  describe('users were not found', () => {
    test('should get 400', async () => {
      findAllUsersMock.mockImplementation(() => null);

      const mockRequest: Partial<Request> = {};

      await userController.getUsers(
        mockRequest as Request,
        mockResponse as Response,
        next
      );
      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
    test('should notify that users were not found', async () => {
      findAllUsersMock.mockImplementation(() => null);

      const mockRequest: Partial<Request> = {};

      await userController.getUsers(
        mockRequest as Request,
        mockResponse as Response,
        next
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: USERS_NOT_FOUND,
      });
    });
  });

  describe('error occured', () => {
    test('should call next method with error', async () => {
      findAllUsersMock.mockImplementation(() => {
        throw new Error(USERS_SEARCH_FAILURE);
      });
      const req = {};

      await userController.getUsers(
        req as Request,
        mockResponse as Response,
        next
      );

      expect(next).toReturnWith(1);
    });
  });
});
