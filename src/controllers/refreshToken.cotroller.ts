import { NextFunction, Request, Response } from 'express';
import refreshTokenService from '../services/token.services/refreshToken.service';

import { AUTH_NOT_AUTHORIZED } from '../consts/auth.const';
import RequestRejection from '../models/RequestRejection.model';

const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new RequestRejection(403, AUTH_NOT_AUTHORIZED);
    }

    const refreshedTokens: { accessToken: string; refreshToken: string } =
      await refreshTokenService.refreshToken(refreshToken);

    const cookiesMaxAge = 5 * 24 * 60 * 60 * 1000;
    res.cookie('refreshToken', refreshedTokens.refreshToken, {
      maxAge: cookiesMaxAge,
      httpOnly: true,
    });

    res.status(200).json({ accessToken: refreshedTokens.accessToken });
  } catch (e) {
    next(e);
  }
};

export default refreshTokenController;
