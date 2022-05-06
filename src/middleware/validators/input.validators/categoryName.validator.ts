import { body } from 'express-validator';

import { CATEGORY_INVALID_NAME } from '../../../consts/category.const';

const getCategoryNameValidator = (fieldName: string) =>
  body(fieldName)
    .isLength({ min: 5, max: 100 })
    .trim()
    .withMessage(CATEGORY_INVALID_NAME);

export default getCategoryNameValidator;
