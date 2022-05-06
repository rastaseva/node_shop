import createUserService from './user.services/createUser.service';
import getUsersService from './user.services/getUsers.service';

const userService = {
  createUser: createUserService,
  getUsers: getUsersService,
};

export default userService;
