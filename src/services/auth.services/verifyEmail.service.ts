import User from '../../models/user.model';

const verifyEmailService = async (token: string) => {
  const res = await User.update(
    { verifyToken: '', isActive: true },
    {
      where: {
        verifyToken: token,
      },
    }
  );
  return {
    success: res[0] !== 0,
    message: res[0] !== 0 ? 'Email verifed' : 'Invalid link',
  };
};

export default verifyEmailService;
