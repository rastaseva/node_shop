import { body } from 'express-validator';

import { FORM_PASSWORD_REQUIREMENTS } from '../../../consts/form.const';
import { getFieldDescriptionString } from '../../../utils/fn.util';

const getPasswordValidator = (fieldName: string) =>
  body(fieldName)
    .optional()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      getFieldDescriptionString(fieldName, FORM_PASSWORD_REQUIREMENTS)
    );

export default getPasswordValidator;
