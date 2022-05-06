import loginService from './auth.services/login.service';
import recoverTokenService from './auth.services/recoverToken.service';
import signupService from './auth.services/signup.service';
import verifyEmailService from './auth.services/verifyEmail.service';

const authService = {
  signup: signupService,
  login: loginService.login,
  verifyEmail: verifyEmailService,
  getRecoverToken: recoverTokenService,
};

export default authService;
