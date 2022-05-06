import { NextFunction, Request, Response } from 'express';

import {
  USER_CREATE_FAILURE,
  USER_REQUEST_BODY_EMPTY,
} from '../../../consts/user.const';
import userController from '../../user.controller';

const createUserMock = jest.fn();

jest.mock('../../../services/user.service', () => ({
  createUser: () => createUserMock(),
}));

let next: NextFunction;

beforeEach(() => {
  next = jest.fn().mockImplementation((...args) => args.length);
});

describe('users controller create request and responce', () => {
  test('should get 400 if request is empty', async () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await userController.createUser(
      mockRequest as Request,
      mockResponse as Response,
      next
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(USER_REQUEST_BODY_EMPTY);
  });

  test('should get 400 if an error occured', async () => {
    createUserMock.mockImplementation(() => {
      throw new Error(USER_CREATE_FAILURE);
    });

    const user = {
      name: 'Alex',
      email: 'alex@gmail.com',
      password: '123',
      token: 'qwe',
    };

    const mockRequest = (body: any) => ({
      body,
    });
    const req = mockRequest(user);
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await userController.createUser(
      req as Request,
      mockResponse as Response,
      next
    );
    expect(next).toReturnWith(1);
  });

  test('Should create a user', async () => {
    const user = {
      name: 'Alex',
      email: 'alex@gmail.com',
      password: '123',
      token: 'qwe',
    };

    createUserMock.mockImplementation(() => user);

    const mockRequest = (body: any) => ({
      body,
    });
    const req = mockRequest(user);
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    await userController.createUser(req as Request, res as Response, next);
    expect(res.json).toHaveBeenCalledWith({
      name: 'Alex',
      email: 'alex@gmail.com',
      password: '123',
      token: 'qwe',
    });
  });
});
