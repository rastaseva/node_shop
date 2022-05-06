import User from '../../models/user.model';

const createUserService = async (
  name: string,
  email: string,
  password: string,
  verifyToken: string
) => {
  await User.create({
    name,
    email,
    password,
    verifyToken,
  });
};

export default createUserService;
