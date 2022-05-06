import jwt from 'jsonwebtoken';
import tokenModel from '../../models/token.model';

import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from '../../consts/secret.const';

const accessSecret = String(JWT_ACCESS_SECRET);
const refreshSecret = String(JWT_REFRESH_SECRET);

const generateTokens = (payload: { userId: number; userRole: string }) => {
  const accessToken = jwt.sign(payload, accessSecret, {
    expiresIn: '5m',
  });
  const refreshToken = jwt.sign(payload, refreshSecret, {
    expiresIn: '5d',
  });

  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async (userId: number, refreshToken: string) => {
  const tokenData = await tokenModel.findOne({
    raw: true,
    where: {
      id: userId,
    },
  });
  if (tokenData) {
    const res = await tokenModel.update(
      { refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    return res;
  }
  const token = await tokenModel.create({ id: userId, refreshToken });
  return token;
};

const validateAccessToken = (token: string) => {
  try {
    const userData = jwt.verify(token, accessSecret);
    if (!userData) throw new Error();
    return userData;
  } catch (e) {
    return null;
  }
};

const validateRefreshToken = (token: string) => {
  try {
    const userData = jwt.verify(token, refreshSecret);
    if (!userData) throw new Error();
    return userData;
  } catch (e) {
    return null;
  }
};

const tokenService = {
  generateTokens,
  saveToken,
  validateAccessToken,
  validateRefreshToken,
};

export default tokenService;
