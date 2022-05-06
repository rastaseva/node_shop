import createUserController from '../user.controllers/createUser.controller';
import userController from '../user.controller';

describe('userController', () => {
  test('createUser method should contain createUserController', () =>
    expect(userController.createUser).toBe(createUserController));
});
