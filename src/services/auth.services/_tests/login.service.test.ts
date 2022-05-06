import loginService from '../login.service';

import {
  LOGIN_INVALID_CREDENTIALS,
  LOGIN_SUCCESS,
  LOGIN_USER_NOT_ACTIVE,
} from '../../../consts/auth.const';

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'password'),
  compare: jest.fn(() => true),
}));

const findOneMock = jest.fn();
const createMock = jest.fn();

jest.mock('../../../models/user.model', () => ({
  findOne: () => findOneMock(),
  create: () => createMock(),
}));

const email = 'email';
const password = 'password';

describe('Login service', () => {
  test('Should handle LOGIN_INVALID_DATA message, when email was not found in db', () => {
    findOneMock.mockReturnValueOnce(null);

    return expect(loginService.login(email, password)).resolves.toStrictEqual({
      success: false,
      message: LOGIN_INVALID_CREDENTIALS,
    });
  });

  describe('Credentials were correct, but email is not verified', () => {
    test('Should handle LOGIN_USER_NOT_ACTIVE message', () => {
      findOneMock.mockReturnValueOnce({ isActive: false });

      return expect(loginService.login(email, password)).resolves.toStrictEqual(
        {
          success: false,
          message: LOGIN_USER_NOT_ACTIVE,
        }
      );
    });
  });

  describe('Credentials were correct and email is verified', () => {
    test('Should handle LOGIN_SUCCESS message', () => {
      findOneMock.mockReturnValueOnce({ isActive: true });

      return expect(loginService.login(email, password)).resolves.toStrictEqual(
        {
          success: true,
          message: LOGIN_SUCCESS,
        }
      );
    });
  });
});
