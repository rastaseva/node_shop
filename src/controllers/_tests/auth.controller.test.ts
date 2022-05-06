import authController from '../auth.controller';
import loginController from '../auth.controllers/login.controller';
import signupController from '../auth.controllers/signup.controller';
import verifyEmailController from '../auth.controllers/verifyEmail.controller';

describe('authController', () => {
  test('signup method should contain signupController', () =>
    expect(authController.signup).toBe(signupController));
  test('login method should contain loginController', () =>
    expect(authController.login).toBe(loginController));
  test('verifyEmail method should contain verifyEmailController', () =>
    expect(authController.verifyEmail).toBe(verifyEmailController));
});
