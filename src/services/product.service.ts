import createProductService from './products.services/createProduct.service';
import getFilteredProductsService from './products.services/getFilteredProducts.service';
import getProductsService from './products.services/getProducts.service';
import sortProductsService from './products.services/sortProducts.service';

const productService = {
  createProduct: createProductService,
  getProducts: getProductsService,
  getFilteredProducts: getFilteredProductsService,
  sortProducts: sortProductsService,
};

export default productService;
