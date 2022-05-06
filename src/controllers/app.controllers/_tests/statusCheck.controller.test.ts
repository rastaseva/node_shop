import { NextFunction, Request, Response } from 'express';

import {
  APP_STATUSCHECK_FAILURE_MESSAGE,
  APP_STATUSCHECK_SUCCESS_MESSAGE,
} from '../../../consts/general.const';

import statusCheck from '../statusCheck.controller';

const authenticateMock = jest.fn();

jest.mock('sequelize', () => ({
  Sequelize: class Sequelize {
    authenticate() {
      authenticateMock();
    }
  },
}));

const statusCheckMock = jest.fn();
jest.mock('../../../services/emailer.service', () => ({
  statusCheck: () => statusCheckMock(),
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

const req = {};

describe('statusCheck controller', () => {
  describe('should handle inner error', () => {
    const error = new Error();
    statusCheckMock.mockImplementationOnce(() => {
      throw error;
    });

    test('should call next with an error', async () => {
      await statusCheck(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('should respond with correct status and message if service is available', () => {
    const correctStatus = 200;
    const correctJson = { message: APP_STATUSCHECK_SUCCESS_MESSAGE };

    statusCheckMock.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    test('should call status with correct status', async () => {
      await statusCheck(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(correctStatus);
    });

    test('should call json with correct json', async () => {
      await statusCheck(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(correctJson);
    });
  });

  describe('should respond with correct status and message if database is unavailable', () => {
    const correctStatus = 200;
    const correctJson = { message: APP_STATUSCHECK_FAILURE_MESSAGE };

    statusCheckMock.mockResolvedValueOnce(true).mockResolvedValueOnce(true);

    test('should call status with correct status', async () => {
      authenticateMock.mockImplementationOnce(() => {
        throw new Error();
      });
      await statusCheck(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(correctStatus);
    });

    test('should call json with correct json', async () => {
      authenticateMock.mockImplementationOnce(() => {
        throw new Error();
      });
      await statusCheck(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(correctJson);
    });
  });
});
