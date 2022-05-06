import bcrypt from 'bcrypt';

import User from '../../models/user.model';

import {
  LOGIN_INVALID_CREDENTIALS,
  LOGIN_SUCCESS,
  LOGIN_USER_NOT_ACTIVE,
} from '../../consts/auth.const';

const getAuthUserData = async (emailBody: string, passwordBody: string) => {
  const foundUser = await User.findOne({
    raw: true,
    where: {
      email: emailBody,
    },
  });

  let isPasswordMatch;

  if (foundUser) {
    isPasswordMatch = await bcrypt.compare(passwordBody, foundUser.password);
  } else {
    isPasswordMatch = false;
  }

  return isPasswordMatch && foundUser;
};

const login = async (emailBody: string, passwordBody: string) => {
  const user = await getAuthUserData(emailBody, passwordBody);

  const isSuccesful = user ? user.isActive : false;

  let responseMessage;
  if (user) {
    responseMessage = user.isActive ? LOGIN_SUCCESS : LOGIN_USER_NOT_ACTIVE;
  } else {
    responseMessage = LOGIN_INVALID_CREDENTIALS;
  }

  const response: { success: boolean; message: string } = {
    success: isSuccesful,
    message: responseMessage,
  };

  return response;
};

const loginService = { getAuthUserData, login };

export default loginService;
