import { generateToken } from '../../utils/fn.util';
import User from '../../models/user.model';

const recoverTokenService = async (): Promise<string> => {
  const tokenLength = 16;
  const recoverToken = generateToken(tokenLength);

  const user = await User.findOne({
    where: {
      recoverToken,
    },
  });

  return user ? recoverTokenService() : recoverToken;
};

export default recoverTokenService;
