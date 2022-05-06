import verifyEmail from '../verifyEmail.service';

class DBUser {
  name: string;

  email: string;

  password: string;

  token: string;

  isActive: boolean;

  constructor(name: string, email: string, password: string, token: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.token = token;
    this.isActive = false;
  }

  update() {
    this.token = '';
    this.isActive = true;
  }
}

const db = [
  new DBUser('Alex', 'alex@gmail.com', '123', 'qwe'),
  new DBUser('Bob', 'bob@gmail.com', '456', 'rty'),
];

jest.mock('../../../models/user.model', () => ({
  update: jest.fn().mockImplementation(
    (
      obj1: { verifyToken: string; isActive: boolean },

      obj2: { where: { verifyToken: string } }
    ) => {
      const user = db.find((el) => el.token === obj2.where.verifyToken);
      const result: {
        success: number[];
        fail: number[];
      } = {
        success: [1],
        fail: [0],
      };
      return user ? result.success : result.fail;
    }
  ),
}));
describe('verify service with invalid token', () => {
  test('should get response invalid link', async () => {
    expect(await verifyEmail('empty')).toStrictEqual({
      success: false,
      message: 'Invalid link',
    });
  });
});

describe('controller works corectlly for route verify', () => {
  test('should get response email verifed token is set', async () => {
    expect(await verifyEmail('rty')).toStrictEqual({
      success: true,
      message: 'Email verifed',
    });
  });
});
