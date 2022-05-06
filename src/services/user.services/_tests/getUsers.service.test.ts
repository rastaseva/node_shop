import userService from '../../user.service';

const findAllMock = jest.fn();

jest.mock('../../../models/user.model', () => ({
  findAll: () => findAllMock(),
}));
describe('signup service', () => {
  test('should find all users with role user', async () => {
    findAllMock.mockImplementation(() => 'Users array');
    expect(await userService.getUsers('user')).toStrictEqual('Users array');
  });
  test('should return error if users are not found', async () => {
    findAllMock.mockImplementation(() => null);
    expect(await userService.getUsers('')).toStrictEqual(null);
  });
});
