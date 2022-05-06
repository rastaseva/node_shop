import createProductController from '../products.controllers/createProduct.controller';
import productController from '../products.controller';

describe('userController', () => {
  test('createUser method should contain createUserController', () =>
    expect(productController.createProduct).toBe(createProductController));
});
