import createUserService from '../user.services/createUser.service';
import userService from '../user.service';

describe('authService', () => {
  test('createUser method should contain createUserService', () =>
    expect(userService.createUser).toBe(createUserService));
});
