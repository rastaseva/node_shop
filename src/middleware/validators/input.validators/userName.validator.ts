import { body } from 'express-validator';

import { FORM_USER_NAME_REQUIREMENTS } from '../../../consts/form.const';
import { getFieldDescriptionString } from '../../../utils/fn.util';

const getUserNameValidator = (fieldName: string) =>
  body(fieldName)
    .optional()
    .isLength({ min: 2, max: 10 })
    .withMessage(
      getFieldDescriptionString(fieldName, FORM_USER_NAME_REQUIREMENTS)
    );

export default getUserNameValidator;
