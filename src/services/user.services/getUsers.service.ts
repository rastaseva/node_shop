import User from '../../models/user.model';

async function getUsersService(role: string) {
  const users = await User.findAll({
    where: {
      role,
    },
    attributes: ['id', 'name', 'role'],
  });
  return users;
}

export default getUsersService;
