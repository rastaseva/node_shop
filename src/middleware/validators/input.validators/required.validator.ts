import { body } from 'express-validator';

import { FORM_REQUIRED_FIELD_MISSING } from '../../../consts/form.const';
import { getFieldDescriptionString } from '../../../utils/fn.util';

const getRequiredFieldsValidator = (fieldName: string) =>
  body(fieldName)
    .exists()
    .withMessage(
      getFieldDescriptionString(fieldName, FORM_REQUIRED_FIELD_MISSING)
    );

export default getRequiredFieldsValidator;
