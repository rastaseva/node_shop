import Product from '../../../models/product.model';
import createProductService from '../createProduct.service';

jest.mock('../../../models/product.model', () => ({
  create: jest
    .fn()
    .mockImplementation(
      (obj: {
        name: string;
        slug: string;
        price: string;
        description: string;
        image: string;
        author: string;
      }) => obj
    ),
}));

describe('createProduct service', () => {
  test('should create product', async () => {
    await createProductService(
      'Notebook',
      'Asus_Notebook',
      '120$',
      'Asus Notebook Company',
      ' ',
      ' '
    );
    expect(Product.create).toHaveBeenCalledWith({
      name: 'Notebook',
      slug: 'Asus_Notebook',
      price: '120$',
      description: 'Asus Notebook Company',
      image: ' ',
      author: ' ',
    });
  });
});
