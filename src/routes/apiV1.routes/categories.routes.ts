import { Router } from 'express';

import categoriesController from '../../controllers/categories.controller';
import categoryMiddleware from '../../middleware/category.middleware';

const categoriesRouter = Router();

categoriesRouter.post(
  '/define',
  categoryMiddleware.category,
  categoriesController.createCategory
);
categoriesRouter.get('/:categoryId', categoriesController.getCategory);
categoriesRouter.get(
  '/type/:categoriesType',
  categoriesController.getCategories
);

export default categoriesRouter;
