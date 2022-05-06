import { Router } from 'express';

import productController from '../../controllers/products.controller';

import authMiddleware from '../../middleware/auth.middleware';
import upload from '../../middleware/upload';

const productsRouter = Router();

productsRouter.post(
  '/define',

  authMiddleware.authCheck,
  authMiddleware.roleCheck(['user']),
  upload.single('image'),
  productController.createProduct
);

productsRouter.get('/all', productController.getProducts);

productsRouter.use('/custom', productController.sortProducts);
productsRouter.get('/:productLetter', productController.getFilteredProducts);

export default productsRouter;
