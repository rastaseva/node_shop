import inputValidator from './validators/input.validator';
import middlewareController from './middleware.controller';

const nameField = 'name';
const slugField = 'slug';

const category = [
  ...[nameField, slugField].map((u) => inputValidator.required(u)),
  inputValidator.categoryName(nameField),
  inputValidator.slug(slugField),
  middlewareController.validation,
];

const categoryMiddleware = {
  category,
};

export default categoryMiddleware;
