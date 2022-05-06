import getFilteredProductsService from '../getFilteredProducts.service';

const findAllMock = jest.fn();

jest.mock('../../../models/product.model', () => ({
  findAll: () => findAllMock(),
}));

describe('Get service works correctly', () => {
  test('should find all products filtered by correct letter', async () => {
    findAllMock.mockImplementation(() => {
      const result = [
        {
          name: 'Personal Computer',
          slug: 'Asus_Notebook',
        },
        {
          name: 'Laptop',
          slug: 'Asus_Notebook2',
        },
        {
          name: 'Lottery',
          slug: 'Asus_Notebook2',
        },
      ];
      return result;
    });
    const productLetter = 'l';
    expect(await getFilteredProductsService(productLetter)).toEqual([
      {
        name: 'Laptop',
        slug: 'Asus_Notebook2',
      },
      {
        name: 'Lottery',
        slug: 'Asus_Notebook2',
      },
    ]);
  });
  test('should get response with empty array', async () => {
    findAllMock.mockImplementation(() => {
      const result = [
        {
          name: 'Personal Computer',
          slug: 'Asus_Notebook',
        },
        {
          name: 'Jackpot',
          slug: 'Asus_Notebook2',
        },
        {
          name: 'Salat',
          slug: 'Asus_Notebook2',
        },
      ];
      return result;
    });
    const productLetter = 'l';
    expect(await getFilteredProductsService(productLetter)).toStrictEqual([]);
  });
});
