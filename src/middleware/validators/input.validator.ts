import getCategoryNameValidator from './input.validators/categoryName.validator';
import getConfirmValidator from './input.validators/confirm.validator';
import getEmailValidator from './input.validators/email.validator';
import getPasswordValidator from './input.validators/password.validator';
import getRequiredFieldsValidator from './input.validators/required.validator';
import getSlugValidator from './input.validators/slug.validator';
import getUserNameValidator from './input.validators/userName.validator';

const inputValidator = {
  email: getEmailValidator,
  userName: getUserNameValidator,
  password: getPasswordValidator,
  confirm: getConfirmValidator,
  required: getRequiredFieldsValidator,
  slug: getSlugValidator,
  categoryName: getCategoryNameValidator,
};

export default inputValidator;
