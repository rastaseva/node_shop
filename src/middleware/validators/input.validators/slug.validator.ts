import { body } from 'express-validator';

import { CATEGORY_INVALID_SLUG } from '../../../consts/category.const';
import { getFieldDescriptionString } from '../../../utils/fn.util';

const getSlugValidator = (fieldName: string) =>
  body(fieldName)
    .isLength({ min: 5, max: 100 })
    .matches(/^[A-Za-z0-9 _-]+$/)
    .withMessage(getFieldDescriptionString(fieldName, CATEGORY_INVALID_SLUG));

export default getSlugValidator;
