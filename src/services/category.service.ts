import createCategoryService from './category.services/createCategory.service';
import getCategoriesService from './category.services/getCategories.service';
import getCategoryService from './category.services/getCategory.service';

const categoryService = {
  createCategory: createCategoryService,
  getCategory: getCategoryService,
  getCategories: getCategoriesService,
};

export default categoryService;
