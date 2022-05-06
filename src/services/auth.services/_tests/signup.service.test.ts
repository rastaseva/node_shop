import { AUTH_SIGNUP_EMAIL_USED } from '../../../consts/auth.const';
import signupService from '../signup.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'password'),
}));

const findOneMock = jest.fn();
const createMock = jest.fn();

jest.mock('../../../models/user.model', () => ({
  findOne: () => findOneMock(),
  create: () => createMock(),
}));

const name = 'name';
const email = 'email';
const password = 'password';
const user = 'user instance';

describe('signup service', () => {
  test('should return new user if email is free', () => {
    findOneMock.mockReturnValueOnce(null);
    createMock.mockReturnValueOnce(user);

    return expect(signupService(name, email, password)).resolves.toBe(user);
  });

  test('should return string message if email already verified', () => {
    findOneMock.mockReturnValueOnce({ isActive: true });

    return expect(signupService(name, email, password)).resolves.toBe(null);
  });

  test('should update user if email is already used but not verified', () => {
    const existingUser = {
      isActive: false,
      isSaved: false,
      save() {
        this.isSaved = true;
      },
    };
    findOneMock.mockReturnValueOnce(existingUser);

    return expect(signupService(name, email, password)).resolves.toMatchObject({
      isSaved: true,
    });
  });
});
