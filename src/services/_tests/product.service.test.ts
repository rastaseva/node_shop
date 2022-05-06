import createProductService from '../products.services/createProduct.service';
import getFilteredProductsService from '../products.services/getFilteredProducts.service';
import getProductsService from '../products.services/getProducts.service';
import productService from '../product.service';
import sortProductsService from '../products.services/sortProducts.service';

describe('authService', () => {
  test('createUser method should contain createUserService', () =>
    expect(productService.createProduct).toBe(createProductService));
  test('getProducts method should contain getProductsService', () =>
    expect(productService.getProducts).toBe(getProductsService));
  test('getFilteredProducts method should contain getFilteredProductsService', () =>
    expect(productService.getFilteredProducts).toBe(
      getFilteredProductsService
    ));
  test('sortProducts method should contain sortProductsService', () =>
    expect(productService.sortProducts).toBe(sortProductsService));
});
