import { body } from 'express-validator';

import { FORM_EMAIL_INVALID_FORMAT } from '../../../consts/form.const';
import { getFieldDescriptionString } from '../../../utils/fn.util';

const getEmailValidator = (fieldName: string) =>
  body(fieldName)
    .optional()
    .isEmail()
    .withMessage(
      getFieldDescriptionString(fieldName, FORM_EMAIL_INVALID_FORMAT)
    );

export default getEmailValidator;
