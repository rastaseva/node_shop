import { NextFunction, Request, Response } from 'express';

import { CATEGORY_CONTENT_IS_EMPTY } from '../../consts/category.const';
import categoryService from '../../services/category.service';

const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate request
  try {
    if (!req.body) {
      res.status(400).json({ message: CATEGORY_CONTENT_IS_EMPTY });
      return;
    }
    const category = await categoryService.createCategory(
      req.body.name,
      req.body.slug
    );

    res.status(200).json(category);
  } catch (e) {
    next(e);
  }
};

export default createCategoryController;
