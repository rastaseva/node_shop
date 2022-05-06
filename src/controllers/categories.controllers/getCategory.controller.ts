import { NextFunction, Request, Response } from 'express';

import categoryService from '../../services/category.service';

import { CATEGORY_NOT_FOUND } from '../../consts/category.const';

const getCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.getCategory(req.params.categoryId);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(400).json({ message: CATEGORY_NOT_FOUND });
    }
  } catch (e) {
    next(e);
  }
};

export default getCategoryController;
