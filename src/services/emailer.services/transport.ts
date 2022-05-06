import config from 'config';
import nodemailer from 'nodemailer';

import { GMAIL_APP_PASSWORD } from '../../consts/secret.const';

const service = 'gmail';
const emailer = String(config.get('EMAILER'));

const transport = nodemailer.createTransport({
  service,
  auth: {
    user: emailer,
    pass: GMAIL_APP_PASSWORD,
  },
});

export default transport;
