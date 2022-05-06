import jwt from 'jsonwebtoken';
import tokenService from '../token.service';

const payload = { userId: 1, userRole: 'user' };
const jwtToken = 'jwt token';
const userId = 1;
const verifyToken = 'verify token';
const accessSecret = 'access secret';
const refreshSecret = 'refresh secret';

const verifyTokenMock = jest.fn();

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => jwtToken),
  verify: () => verifyTokenMock(),
}));

const findOneTokenMock = jest.fn();
const updateTokenMock = jest.fn();
const createTokenMock = jest.fn();

jest.mock('../../../models/token.model', () => ({
  findOne: () => findOneTokenMock(),
  update: () => updateTokenMock(),
  create: () => createTokenMock(),
}));

describe('tokenService', () => {
  describe('generateTokens', () => {
    test('Should return a pair of tokens', () =>
      expect(tokenService.generateTokens(payload)).toStrictEqual({
        accessToken: jwtToken,
        refreshToken: jwtToken,
      }));
  });

  describe('saveToken', () => {
    test('Should update token in db', () => {
      findOneTokenMock.mockReturnValueOnce(true);
      updateTokenMock.mockReturnValueOnce(true);

      return expect(tokenService.saveToken(userId, jwtToken)).toBeTruthy();
    });

    test('Should create new token in db', () => {
      findOneTokenMock.mockReturnValueOnce(false);
      createTokenMock.mockReturnValueOnce(true);

      return expect(tokenService.saveToken(userId, jwtToken)).toBeTruthy();
    });
  });

  describe('validateAccessToken', () => {
    test('Should validate token', () => {
      verifyTokenMock.mockReturnValueOnce(payload);

      return expect(tokenService.validateAccessToken(jwtToken)).toStrictEqual(
        payload
      );
    });
    test('Should return null if token is invalid', () => {
      verifyTokenMock.mockReturnValueOnce(null);

      return expect(tokenService.validateAccessToken(jwtToken)).toBeNull();
    });
  });

  describe('validateRefreshToken', () => {
    test('Should validate token', () => {
      verifyTokenMock.mockReturnValueOnce(payload);

      return expect(tokenService.validateRefreshToken(jwtToken)).toStrictEqual(
        payload
      );
    });
    test('Should return null if token is invalid', () => {
      verifyTokenMock.mockReturnValueOnce(null);

      return expect(tokenService.validateRefreshToken(jwtToken)).toBeNull();
    });
  });
});
