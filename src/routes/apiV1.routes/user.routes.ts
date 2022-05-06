import { Router } from 'express';
import authMiddleware from '../../middleware/auth.middleware';
import userController from '../../controllers/user.controller';

const userRouter = Router();

userRouter.get(
  '/',
  authMiddleware.authCheck,
  authMiddleware.roleCheck(['user']),
  userController.getUsers
);
userRouter.post('/define', userController.createUser);

// userRouter.get(
//   '/:userId',
//   authMiddleware.authCheck,
//   authMiddleware.roleCheck(['user', 'admin']),
//   userController.getUsers
// );

export default userRouter;
