import verifyTokenService from '../verifyToken.service';

const findOneMock = jest.fn();

jest.mock('../../../models/user.model', () => ({
  findOne: () => findOneMock(),
}));

jest.mock('../../../utils/fn.util', () => ({
  generateToken: jest.fn(() => 'token'),
}));

describe('recoverToken service', () => {
  test('should return a new token if this token is unique', () => {
    findOneMock.mockReturnValueOnce(true);
    findOneMock.mockReturnValueOnce(null);

    return expect(verifyTokenService()).resolves.toBe('token');
  });
});
