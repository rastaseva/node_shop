import validateEmailService from '../validateEmail.service';

const axiosMock = jest.fn();

jest.mock('axios', () => ({
  get: () => axiosMock(),
}));

const rejectedResponse = {
  response: {
    data: 'rejectedResponse',
  },
};
const email = 'e@mail.com';

describe('validateEmailService', () => {
  test('should handle valid email without failover', () => {
    axiosMock.mockImplementationOnce(
      () =>
        new Promise((resolve, reject) =>
          resolve({
            data: {
              isValidFormat: true,
              aliases: [1, 2, 3],
            },
          })
        )
    );

    return expect(validateEmailService(email)).resolves.toBe(true);
  });

  test('should handle valid email with failover', () => {
    axiosMock
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(rejectedResponse))
      )
      .mockImplementationOnce(
        () =>
          new Promise((resolve, reject) =>
            resolve({
              data: {
                format_valid: true,
              },
            })
          )
      );

    return expect(validateEmailService(email)).resolves.toBe(true);
  });

  test('should return null if failover validator response success is false', () => {
    axiosMock
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(rejectedResponse))
      )
      .mockImplementationOnce(
        () =>
          new Promise((resolve, reject) =>
            resolve({
              data: {
                success: false,
              },
            })
          )
      );

    return expect(validateEmailService(email)).resolves.toBe(null);
  });

  test('should return null if all validators failed', () => {
    axiosMock
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(rejectedResponse))
      )
      .mockImplementationOnce(
        () => new Promise((resolve, reject) => reject(rejectedResponse))
      );

    return expect(validateEmailService(email)).resolves.toBe(null);
  });
});
