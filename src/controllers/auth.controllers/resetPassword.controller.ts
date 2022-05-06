import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import {
  AUTH_PASSWORD_CHANGED,
  AUTH_RECOVERY_INVALID_TOKEN,
} from '../../consts/auth.const';
import RequestRejection from '../../models/RequestRejection.model';
import User from '../../models/user.model';

const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      where: {
        recoverToken: token,
      },
    });

    if (!user) {
      throw new RequestRejection(400, AUTH_RECOVERY_INVALID_TOKEN);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
    user.recoverToken = null;
    await user.save();

    res.status(200).json({ message: AUTH_PASSWORD_CHANGED });
  } catch (e) {
    console.log(e);
    // handling error or reject
    next(e);
  }
};

export default resetPasswordController;
