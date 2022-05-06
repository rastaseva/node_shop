import createProductController from './products.controllers/createProduct.controller';
import getFilteredProductsController from './products.controllers/getFilteredProducts.controller';
import getProductsController from './products.controllers/getProducts.controller';
import sortProductsController from './products.controllers/sortProducts.controller';

const productsController = {
  createProduct: createProductController,
  getProducts: getProductsController,
  getFilteredProducts: getFilteredProductsController,
  sortProducts: sortProductsController,
};

export default productsController;
