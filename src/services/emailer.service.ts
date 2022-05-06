import sendEmailService from './emailer.services/sendEmail.service';
import statusCheck from './emailer.services/statusCheck.service';
import validateEmailService from './emailer.services/validateEmail.service';

const emailerService = {
  name: 'emailer',
  sendEmail: sendEmailService,
  validateEmail: validateEmailService,
  statusCheck,
};

export default emailerService;
