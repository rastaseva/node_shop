import { NextFunction, Request, Response } from 'express';
import authMiddleware from '../auth.middleware';

import {
  AUTH_NOT_AUTHORIZED,
  AUTH_NOT_PERMITED,
} from '../../consts/auth.const';

const email = 'e@mail.com';
const password = 'password123A!';

const userData = { userId: 1, userRole: 'user' };
const wrongUserData = { userId: 1, userRole: 'X?D' };
const passedRoles = ['user', 'admin'];

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

const validateTokenMock = jest.fn();

jest.mock('../../services/token.services/token.service', () => ({
  validateAccessToken: () => validateTokenMock(),
}));

let next: NextFunction;

beforeEach(() => {
  next = jest.fn().mockImplementation((...args) => args.length);
});

const runValidatorsChain = async (
  request: Request,
  chainArray: ((req: Request, res: Response, next: NextFunction) => void)[]
) => {
  await chainArray.reduce(async (promise, u) => {
    await promise;
    await u(request as Request, res as Response, next as NextFunction);
  }, Promise.resolve());
};

describe('authValidator', () => {
  describe('signup validator', () => {
    test('should pass valid request', async () => {
      const body = { email, password, confirmPassword: password };

      await runValidatorsChain({ body } as Request, authMiddleware.signup);

      expect(next).toHaveBeenCalledTimes(authMiddleware.signup.length);
    });

    test('should trigger response with errors if request contains invalid data', async () => {
      const body = { email, password, confirmPassword: null };

      await authMiddleware.signup.forEach(async (u) =>
        u({ body } as Request, res as Response, next as NextFunction)
      );
      await runValidatorsChain({ body } as Request, authMiddleware.signup);

      expect(next).toHaveReturnedWith(1);
    });
  });

  describe('login validator', () => {
    test('should pass valid request', async () => {
      const body = { email, password };

      await runValidatorsChain({ body } as Request, authMiddleware.login);

      expect(next).toHaveBeenCalledTimes(authMiddleware.login.length);
    });

    test('should trigger response with errors if request contains invalid data', async () => {
      const body = { email };

      await runValidatorsChain({ body } as Request, authMiddleware.login);

      expect(next).toHaveReturnedWith(1);
    });
  });
});

describe('authMiddlewares', () => {
  describe('authCheck', () => {
    test('should check if user is authorized and perform next()', () => {
      validateTokenMock.mockReturnValueOnce(userData);
      const req = {
        headers: {
          authorization: 'Bearer jwtToken',
        },
      };

      authMiddleware.authCheck(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });

    describe('Bearer token was not passed', () => {
      test('should call next with correct status and message if no authorization in header provided', () => {
        const req = {
          headers: {},
        };

        authMiddleware.authCheck(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({
            status: 403,
            message: AUTH_NOT_AUTHORIZED,
          })
        );
      });
    });

    describe('Bearer token had invalid form', () => {
      test('should call next with correct status and message if no authorization header format is invalid', () => {
        const req = {
          headers: {
            authorization: 'Bearer',
          },
        };

        authMiddleware.authCheck(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({
            status: 403,
            message: AUTH_NOT_AUTHORIZED,
          })
        );
      });
    });

    describe('Bearer token is invalid', () => {
      test('should call next with correct status and message if token is not valid', () => {
        validateTokenMock.mockReturnValueOnce(null);
        const req = {
          headers: {
            authorization: 'Bearer jwtoken',
          },
        };
        authMiddleware.authCheck(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({
            status: 403,
            message: AUTH_NOT_AUTHORIZED,
          })
        );
      });
    });
  });

  describe('roleCheck', () => {
    test('should check if user has apropriate role and perform next()', () => {
      validateTokenMock.mockReturnValueOnce(userData);
      const req = {
        headers: {
          authorization: 'Bearer jwtToken',
        },
      };

      authMiddleware.roleCheck(passedRoles)(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });

    describe('Bearer token was not passed', () => {
      test('should call next with correct status and message if no authorization in header provided', () => {
        const req = {
          headers: {},
        };

        authMiddleware.roleCheck(passedRoles)(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({
            status: 403,
            message: AUTH_NOT_AUTHORIZED,
          })
        );
      });
    });

    describe('Bearer token has invalid form', () => {
      test('should call next with correct status and message if no authorization header format is invalid', () => {
        const req = {
          headers: {
            authorization: 'Bearer',
          },
        };

        authMiddleware.roleCheck(passedRoles)(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({
            status: 403,
            message: AUTH_NOT_AUTHORIZED,
          })
        );
      });
      test('should call next with correct status and message if token is invalid', () => {
        validateTokenMock.mockReturnValueOnce(wrongUserData);
        const req = {
          headers: {
            authorization: 'Bearer Token',
          },
        };

        authMiddleware.roleCheck(passedRoles)(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({
            status: 403,
            message: AUTH_NOT_PERMITED,
          })
        );
      });
    });
  });
});
