import loginController from './auth.controllers/login.controller';
import recoverController from './auth.controllers/recover.controller';
import resetPasswordController from './auth.controllers/resetPassword.controller';
import signupController from './auth.controllers/signup.controller';
import verifyEmailController from './auth.controllers/verifyEmail.controller';

const authController = {
  signup: signupController,
  login: loginController,
  verifyEmail: verifyEmailController,
  recover: recoverController,
  resetPassword: resetPasswordController,
};

export default authController;
