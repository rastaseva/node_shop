import getCategoriesService from '../getCategories.service';

const findAllMock = jest.fn();

jest.mock('../../../models/category.model', () => ({
  findAll: () => findAllMock(),
}));

test('should find all categories by type', async () => {
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
  const categoriesType = 'Notebook';
  expect(await getCategoriesService(categoriesType)).toEqual([
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
  const categoriesType = 'Jackson';
  expect(await getCategoriesService(categoriesType)).toStrictEqual([]);
});

test('should get response with null', async () => {
  findAllMock.mockImplementation(() => null);
  const categoriesType = '';
  expect(await getCategoriesService(categoriesType)).toStrictEqual(null);
});
