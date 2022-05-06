import Tokens from '../../models/token.model';
import User from '../../models/user.model';
import tokenService from './token.service';

import { AUTH_NOT_AUTHORIZED } from '../../consts/auth.const';

const getTokenById = async (userId: number) => {
  const foundToken = await Tokens.findOne({
    raw: true,
    where: {
      id: userId,
    },
  });

  return foundToken;
};

const getUserById = async (userId: number) => {
  const foundUser = await User.findOne({
    raw: true,
    where: {
      id: userId,
    },
  });

  return foundUser;
};

const refreshToken = async (rToken: string) => {
  const tokenInfo: any = tokenService.validateRefreshToken(rToken);

  if (!tokenInfo) throw new Error(AUTH_NOT_AUTHORIZED);

  const isTokenFound = await getTokenById(tokenInfo.userId);

  if (!isTokenFound) throw new Error(AUTH_NOT_AUTHORIZED);

  const userData = await getUserById(tokenInfo.userId);

  if (!userData) throw new Error(AUTH_NOT_AUTHORIZED);

  const newTokens = tokenService.generateTokens({
    userId: userData.id,
    userRole: userData.role,
  });

  if (!newTokens) throw new Error(AUTH_NOT_AUTHORIZED);

  await tokenService.saveToken(userData.id, newTokens.refreshToken);
  return { ...newTokens };
};

const refreshTokenService = { getTokenById, refreshToken };

export default refreshTokenService;
