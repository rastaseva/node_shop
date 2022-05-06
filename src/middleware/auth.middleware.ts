import { NextFunction, Request, Response } from 'express';
import inputValidator from './validators/input.validator';
import middlewareController from './middleware.controller';

import { AUTH_NOT_AUTHORIZED, AUTH_NOT_PERMITED } from '../consts/auth.const';

import RequestRejection from '../models/RequestRejection.model';
import tokenService from '../services/token.services/token.service';

const emailField = 'email';
const nameField = 'name';
const passwordField = 'password';
const confirmPasswordField = 'confirmPassword';

const signup = [
  ...[emailField, passwordField, confirmPasswordField].map((u) =>
    inputValidator.required(u)
  ),
  inputValidator.email(emailField),
  inputValidator.password(passwordField),
  inputValidator.confirm(confirmPasswordField, passwordField),
  inputValidator.userName(nameField),
  middlewareController.validation,
];

const login = [
  ...[emailField, passwordField].map((u) => inputValidator.required(u)),
  inputValidator.email(emailField),
  middlewareController.validation,
];

const recover = [
  inputValidator.required(emailField),
  inputValidator.email(emailField),
  middlewareController.validation,
];

const resetPassword = [
  ...[passwordField, confirmPasswordField].map((u) =>
    inputValidator.required(u)
  ),
  inputValidator.password(passwordField),
  inputValidator.confirm(confirmPasswordField, passwordField),
  middlewareController.validation,
];

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new RequestRejection(403, AUTH_NOT_AUTHORIZED);
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new RequestRejection(403, AUTH_NOT_AUTHORIZED);
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new RequestRejection(403, AUTH_NOT_AUTHORIZED);
    }

    next();
  } catch (e) {
    next(e);
  }
};

const roleCheck =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new RequestRejection(403, AUTH_NOT_AUTHORIZED);
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new RequestRejection(403, AUTH_NOT_AUTHORIZED);
      }

      const tokenInfo: any = tokenService.validateAccessToken(token);

      let hasRole = false;

      if (roles.includes(tokenInfo.userRole)) {
        hasRole = true;
      }

      if (!hasRole) {
        throw new RequestRejection(403, AUTH_NOT_PERMITED);
      }

      next();
    } catch (e) {
      next(e);
    }
  };

const authMiddleware = {
  signup,
  login,
  authCheck,
  roleCheck,
  recover,
  resetPassword,
};

export default authMiddleware;
