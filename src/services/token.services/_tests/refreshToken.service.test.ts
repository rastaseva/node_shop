import refreshTokenService from '../refreshToken.service';

import { AUTH_NOT_AUTHORIZED } from '../../../consts/auth.const';

const aToken = 'jwt access token';
const rToken = 'jwt refresh token';
const tokenInfo = { userId: 1 };
const isTokenFound = { userId: 1 };
const userData = { userId: 1 };
const newTokens = { accessToken: aToken, refreshToken: rToken };

const validateTokenMock = jest.fn();
const generateTokensMock = jest.fn();
const saveTokenMock = jest.fn();

jest.mock('../../../services/token.services/token.service', () => ({
  validateRefreshToken: () => validateTokenMock(),
  generateTokens: () => generateTokensMock(),
  saveToken: () => saveTokenMock(),
}));

const findOneTokenMock = jest.fn();

jest.mock('../../../models/token.model', () => ({
  findOne: () => findOneTokenMock(),
}));

const findOneUserMock = jest.fn();

jest.mock('../../../models/user.model', () => ({
  findOne: () => findOneUserMock(),
}));

const passedToken = 'passed token';

describe('refreshTokenService', () => {
  test('Should return a new pair of tokens', () => {
    validateTokenMock.mockReturnValueOnce(tokenInfo);
    findOneTokenMock.mockReturnValueOnce(isTokenFound);
    findOneUserMock.mockReturnValueOnce(userData);
    generateTokensMock.mockReturnValueOnce(newTokens);

    return expect(
      refreshTokenService.refreshToken(passedToken)
    ).resolves.toStrictEqual({
      accessToken: aToken,
      refreshToken: rToken,
    });
  });

  test('Should throw error if token from cookie is invalid', async () => {
    validateTokenMock.mockReturnValueOnce(null);

    await expect(refreshTokenService.refreshToken('xd')).rejects.toThrowError(
      AUTH_NOT_AUTHORIZED
    );
  });

  test('Should throw error if token was not found in db', async () => {
    validateTokenMock.mockReturnValueOnce(tokenInfo);
    findOneTokenMock.mockReturnValueOnce(null);

    await expect(refreshTokenService.refreshToken('xd')).rejects.toThrowError(
      AUTH_NOT_AUTHORIZED
    );
  });

  test('Should throw error if user was not found in db', async () => {
    validateTokenMock.mockReturnValueOnce(tokenInfo);
    findOneTokenMock.mockReturnValueOnce(isTokenFound);
    findOneUserMock.mockReturnValueOnce(null);

    await expect(refreshTokenService.refreshToken('xd')).rejects.toThrowError(
      AUTH_NOT_AUTHORIZED
    );
  });

  test('Should throw error if new tokens were not generated', async () => {
    validateTokenMock.mockReturnValueOnce(tokenInfo);
    findOneTokenMock.mockReturnValueOnce(isTokenFound);
    findOneUserMock.mockReturnValueOnce(userData);
    generateTokensMock.mockReturnValueOnce(null);

    await expect(refreshTokenService.refreshToken('xd')).rejects.toThrowError(
      AUTH_NOT_AUTHORIZED
    );
  });
});
