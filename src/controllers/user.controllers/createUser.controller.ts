import { NextFunction, Request, Response } from 'express';

import userService from '../../services/user.service';

import { USER_REQUEST_BODY_EMPTY } from '../../consts/user.const';

const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate request
  try {
    if (!req.body) {
      res.status(400).json(USER_REQUEST_BODY_EMPTY);
      return;
    }
    const user = await userService.createUser(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.verifyToken
    );

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
export default createUserController;
