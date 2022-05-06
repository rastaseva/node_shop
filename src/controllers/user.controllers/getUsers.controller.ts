import { NextFunction, Request, Response } from 'express';

import userService from '../../services/user.service';

import { USERS_NOT_FOUND } from '../../consts/user.const';

const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundUsers = await userService.getUsers('user');
    if (foundUsers) {
      res.status(200).json(foundUsers);
    } else {
      res.status(400).json({ message: USERS_NOT_FOUND });
    }
  } catch (e) {
    next(e);
  }
};

export default getUsersController;
