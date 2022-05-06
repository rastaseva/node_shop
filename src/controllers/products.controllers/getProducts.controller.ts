import { Request, Response } from 'express';

import { PRODUCT_NOT_FOUND } from '../../consts/product.const';
import productService from '../../services/product.service';

const getProductsController = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProducts();
    if (products.length >= 1) {
      res.status(200).json(products);
    } else throw new Error();
  } catch (error) {
    res.status(400).json({ message: PRODUCT_NOT_FOUND });
  }
};

export default getProductsController;
