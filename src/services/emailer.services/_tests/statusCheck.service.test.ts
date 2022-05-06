import statusCheck from '../statusCheck.service';

const verifyMock = jest.fn();

jest.mock('../transport', () => ({
  verify: () => verifyMock(),
}));

const axiosMock = jest.fn();

jest.mock('axios', () => ({
  get: () => axiosMock(),
}));

describe('statusCheck service', () => {
  test('should return false if error occurs', () => {
    const error = new Error();
    verifyMock.mockImplementationOnce(() => {
      throw error;
    });

    return expect(statusCheck()).resolves.toBe(false);
  });

  test('should return true if all services are available', () => {
    verifyMock.mockImplementationOnce(() => true);
    axiosMock.mockImplementationOnce(
      () =>
        new Promise((resolve, reject) =>
          resolve({
            data: true,
          })
        )
    );

    return expect(statusCheck()).resolves.toBe(true);
  });
});
