import { NextFunction, Request, Response } from 'express';

import { USERS_NOT_FOUND } from '../../consts/user.const';
import RequestRejection from '../../models/RequestRejection.model';

import authService from '../../services/auth.service';
import loginService from '../../services/auth.services/login.service';
import tokenService from '../../services/token.services/token.service';

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const authStatus = await authService.login(
      email as string,
      password as string
    );

    if (!authStatus.success) {
      res.status(400).json({ message: authStatus.message });
      return;
    }

    const userData = await loginService.getAuthUserData(
      email as string,
      password as string
    );

    if (!userData) {
      throw new RequestRejection(401, USERS_NOT_FOUND);
    }

    const jwtTokens = tokenService.generateTokens({
      userId: userData.id,
      userRole: userData.role,
    });

    await tokenService.saveToken(userData.id, jwtTokens.refreshToken);

    const cookiesMaxAge = 5 * 24 * 60 * 60 * 1000;
    res.cookie('refreshToken', jwtTokens.refreshToken, {
      maxAge: cookiesMaxAge,
      httpOnly: true,
    });
    // res.setHeader('Authorization', jwtTokens.accessToken);

    res.status(200).json({
      accessToken: jwtTokens.accessToken,
      message: authStatus.message,
    });
  } catch (e) {
    next(e);
  }
};

export default loginController;
