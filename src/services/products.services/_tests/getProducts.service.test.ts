import getProductsService from '../getProducts.service';

const findAllMock = jest.fn();

jest.mock('../../../models/product.model', () => ({
  findAll: () => findAllMock(),
}));

describe('Get service works correctly', () => {
  test('should find all products', async () => {
    findAllMock.mockImplementation(() => {
      const result = [
        {
          name: 'Notebook',
          slug: 'Asus_Notebook',
        },
        {
          name: 'Notebook',
          slug: 'Asus_Notebook2',
        },
      ];
      return result;
    });
    expect(await getProductsService()).toEqual([
      {
        name: 'Notebook',
        slug: 'Asus_Notebook',
      },
      {
        name: 'Notebook',
        slug: 'Asus_Notebook2',
      },
    ]);
  });
  test('should get response with empty array', async () => {
    findAllMock.mockImplementation(() => []);
    expect(await getProductsService()).toStrictEqual([]);
  });
});
