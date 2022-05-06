import createUserController from './user.controllers/createUser.controller';
import getUsersController from './user.controllers/getUsers.controller';

const userController = {
  createUser: createUserController,
  getUsers: getUsersController,
};

export default userController;
