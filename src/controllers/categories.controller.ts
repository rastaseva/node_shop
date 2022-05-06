import createCategoryController from './categories.controllers/createCategory.controller';
import getCategoriesController from './categories.controllers/getCategories.controller';
import getCategoryController from './categories.controllers/getCategory.controller';

const categoriesController = {
  createCategory: createCategoryController,
  getCategory: getCategoryController,
  getCategories: getCategoriesController,
};

export default categoriesController;
