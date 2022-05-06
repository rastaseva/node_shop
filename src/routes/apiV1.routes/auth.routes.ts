import { Router } from 'express';

import authController from '../../controllers/auth.controller';
import authMiddleware from '../../middleware/auth.middleware';

const authRouter = Router();

authRouter.post('/signup', authMiddleware.signup, authController.signup);
authRouter.post('/login', authMiddleware.login, authController.login);
authRouter.post('/recover', authMiddleware.recover, authController.recover);
authRouter.post(
  '/recover/:token',
  authMiddleware.login,
  authController.resetPassword
);
authRouter.get('/verify/:token', authController.verifyEmail);

export default authRouter;
