import axios from 'axios';

import { APILAYER_KEY, MAILSAC_KEY } from '../../consts/secret.const';
import logger from '../../libs/logger';

const validateEmailService = async (email: string) => {
  const mailsacValidationUrl = 'https://mailsac.com/api/validations/addresses';
  const mailsacAuthKey = String(MAILSAC_KEY);
  const mailsacAuthHeader = { 'Mailsac-Key': mailsacAuthKey };

  const apilayerValidationUrl = `http://apilayer.net/api/check`;

  const validation = await axios
    .get(`${mailsacValidationUrl}/${email}`, {
      headers: mailsacAuthHeader,
    })
    .then((response) => response.data)
    // catch block to handle error and use failover validation
    .catch((e) => {
      logger.error(e);

      return null;
    });

  if (validation) {
    const { isValidFormat, aliases } = validation;
    const isValid = Boolean(isValidFormat && aliases.length);

    return isValid;
  }

  const failoverValidation = await axios
    .get(apilayerValidationUrl, {
      params: { access_key: APILAYER_KEY, email },
    })
    .then((response) => {
      if (response.data && response.data.success !== false) {
        return response.data;
      }
      logger.error(response.data);
      return null;
    })
    .catch((e) => {
      logger.error(e);

      return null;
    });
  // no catch block so we pass error to the 500 route

  if (failoverValidation) {
    const isValidFormat = failoverValidation.format_valid;
    const isValid = Boolean(isValidFormat);

    return isValid;
  }

  return null;
};

export default validateEmailService;
