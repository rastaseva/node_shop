import sendEmailService from '../sendEmail.service';

const sendEmailMock = jest.fn();

jest.mock('nodemailer', () => ({
  createTransport() {
    return {
      sendMail: () => sendEmailMock(),
    };
  },
}));

const emailsArray = ['kek@mail.com', 'lul@mail.com'];
const subject = 'subj';
const text = 'text';
const html = '<p>html</p>';
const errorMessage = 'error';

describe('EmailerService', () => {
  test('should handle error', () => {
    sendEmailMock.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    return expect(
      sendEmailService(emailsArray, subject, text, html)
    ).rejects.toThrow();
  });

  test('should return object with accepted and rejected email arrays', () => {
    const data = {
      accepted: [emailsArray[0]],
      rejected: [emailsArray[1]],
    };
    sendEmailMock.mockImplementation(
      () => new Promise((resolve) => resolve(data))
    );

    return expect(
      sendEmailService(emailsArray, subject, text, html)
    ).resolves.toStrictEqual(data);
  });
});
