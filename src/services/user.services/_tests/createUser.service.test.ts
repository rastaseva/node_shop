import User from '../../../models/user.model';
import createUserService from '../createUser.service';

jest.mock('../../../models/user.model', () => ({
  create: jest
    .fn()
    .mockImplementation(
      (obj: {
        name: string;
        email: string;
        password: string;
        verifyToken: string;
      }) => obj
    ),
}));

describe('verify service with invalid token', () => {
  test('should get response invalid link', async () => {
    await createUserService('Alex', 'alex@gmail.com', '123', 'qwe');
    expect(User.create).toHaveBeenCalledWith({
      email: 'alex@gmail.com',
      name: 'Alex',
      password: '123',
      verifyToken: 'qwe',
    });
  });
});
