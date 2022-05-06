import { NextFunction, Request, Response } from 'express';

import { SOMETHING_WENT_WRONG } from '../../../consts/general.const';
import RequestRejection from '../../../models/RequestRejection.model';

import rejectRouter from '../reject.controller';

describe('Error handler middleware', () => {
  const error: Error = new Error();
  const nextFunction: NextFunction = jest.fn();

  const mockResponse: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  describe('triggered by error', () => {
    const req = {};
    test('should respond with correct status', () => {
      rejectRouter(
        error as Error,
        req as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
    test('should respond with correct json', () => {
      rejectRouter(
        error,
        req as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: SOMETHING_WENT_WRONG,
        })
      );
    });
  });

  describe('triggered by RequestRejection', () => {
    const req = {};
    const reqRejStatus = 400;
    const reqRejMessage = 'message';
    const requestRejection = new RequestRejection(reqRejStatus, reqRejMessage);
    test('should respond with correct status', () => {
      rejectRouter(
        requestRejection,
        req as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(reqRejStatus);
    });
    test('should respond with correct json', () => {
      rejectRouter(
        error as Error,
        req as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: reqRejMessage,
        })
      );
    });
  });
});
