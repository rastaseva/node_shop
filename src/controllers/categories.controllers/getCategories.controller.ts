import { NextFunction, Request, Response } from 'express';

import categoryService from '../../services/category.service';

import { CATEGORIES_NOT_FOUND } from '../../consts/category.const';

const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getCategories(
      req.params.categoriesType
    );
    if (categories.length > 0) {
      res.status(200).json(categories);
    } else {
      res.status(400).json({ message: CATEGORIES_NOT_FOUND });
    }
  } catch (e) {
    next(e);
  }
};

export default getCategoriesController;
