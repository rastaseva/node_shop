import { body } from 'express-validator';

import { FORM_FIELD_CONFIRM_FAILED } from '../../../consts/form.const';
import { getFieldDescriptionString } from '../../../utils/fn.util';

const getConfirmValidator = (fieldName: string, targetFieldName: string) =>
  body(fieldName)
    .optional()
    .custom((val, { req }) => val === req.body[targetFieldName])
    .withMessage(
      getFieldDescriptionString(
        fieldName,
        `${FORM_FIELD_CONFIRM_FAILED} ${targetFieldName}`
      )
    );

export default getConfirmValidator;
