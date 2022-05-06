import { Request, Response } from 'express';

import { PRODUCT_NO_SUCH_SORT } from '../../consts/product.const';
import productService from '../../services/product.service';

const sortProductsController = async (req: Request, res: Response) => {
  try {
    if (req.query.sortType === 'name' || req.query.sortType === 'price') {
      const products = await productService.sortProducts(req.query.sortType);
      res.status(200).json(products);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(400).json({ message: PRODUCT_NO_SUCH_SORT });
  }
};

export default sortProductsController;
