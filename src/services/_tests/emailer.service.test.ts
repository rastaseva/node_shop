import EmailerService from '../emailer.service';
import sendEmailService from '../emailer.services/sendEmail.service';

describe('EmailerService', () => {
  test('sendEmail method should contain sendEmailService', () =>
    expect(EmailerService.sendEmail).toBe(sendEmailService));
});
