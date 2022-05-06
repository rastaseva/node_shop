import bcrypt from 'bcrypt';

import User from '../../models/user.model';

import verifyTokenService from './verifyToken.service';

const signupService = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({
    where: {
      email,
    },
  });

  if (existingUser?.isActive) {
    return null;
  }

  const verifyToken = await verifyTokenService();

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (existingUser) {
    existingUser.name = name;
    existingUser.password = hashedPassword;
    existingUser.verifyToken = verifyToken;
    await existingUser.save();

    return existingUser;
  }

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    verifyToken,
  });

  return newUser;
};

export default signupService;
