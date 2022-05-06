import { generateToken } from '../../utils/fn.util';
import User from '../../models/user.model';

const verifyTokenService = async (): Promise<string> => {
  const tokenLength = 16;
  const verifyToken = generateToken(tokenLength);

  const user = await User.findOne({
    where: {
      verifyToken,
    },
  });

  return user ? verifyTokenService() : verifyToken;
};

export default verifyTokenService;
