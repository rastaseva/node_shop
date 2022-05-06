import { Request, Response } from 'express';

import {
  PRODUCT_NOT_FOUND,
  PRODUCT_NO_SUCH_FILTER,
} from '../../consts/product.const';
import productService from '../../services/product.service';

const getFilteredProductsController = async (req: Request, res: Response) => {
  try {
    const products = await productService.getFilteredProducts(
      req.params.productLetter
    );
    if (
      req.params.productLetter.match(/[A-Z]/gi) &&
      req.params.productLetter.length <= 1
    ) {
      if (products.length > 0) {
        res.status(200).json(products);
      } else {
        res.status(404).json({ message: PRODUCT_NOT_FOUND });
      }
    } else throw new Error();
  } catch (error) {
    res.status(400).json({ message: PRODUCT_NO_SUCH_FILTER });
  }
};

export default getFilteredProductsController;
