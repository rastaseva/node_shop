import authService from '../auth.service';
import loginService from '../auth.services/login.service';
import signupService from '../auth.services/signup.service';
import verifyEmailService from '../auth.services/verifyEmail.service';

describe('authService', () => {
  test('signup method should contain signupService', () =>
    expect(authService.signup).toBe(signupService));
  test('login method should contain loginService.login', () =>
    expect(authService.login).toBe(loginService.login));
  test('verifyEmail method should contain verifyEmailService', () =>
    expect(authService.verifyEmail).toBe(verifyEmailService));
});
