import axios from 'axios';

import { MAILSAC_KEY } from '../../consts/secret.const';
import logger from '../../libs/logger';
import transport from './transport';

const statusCheck = async () => {
  try {
    const transportCheck = await transport.verify();

    const mailsacCheckUrl = 'https://mailsac.com/api/me';
    const mailsacAuthKey = String(MAILSAC_KEY);
    const mailsacAuthHeader = { 'Mailsac-Key': mailsacAuthKey };
    const mailsacCheck = await axios
      .get(`${mailsacCheckUrl}`, {
        headers: mailsacAuthHeader,
      })
      .then((response) => response.data);

    return Boolean(transportCheck && mailsacCheck);
  } catch (e) {
    const loggerMessage = 'Emailer verification failed';
    logger.error(loggerMessage, e);
    return false;
  }
};

export default statusCheck;
