import getCategoryService from '../getCategory.service';

const findOneMock = jest.fn();

jest.mock('../../../models/category.model', () => ({
  findOne: () => findOneMock(),
}));

test('should find category by id', async () => {
  findOneMock.mockImplementation(() => ({
    name: 'Notebook',
    slug: 'Asus_Notebook',
  }));
  const categoryId = '2';
  expect(await getCategoryService(categoryId)).toStrictEqual({
    name: 'Notebook',
    slug: 'Asus_Notebook',
  });
});
test('should get response with empty object', async () => {
  findOneMock.mockImplementation(() => ({}));
  const categoryId = '5';
  expect(await getCategoryService(categoryId)).toStrictEqual({});
});

test('should get response with null', async () => {
  findOneMock.mockImplementation(() => null);
  const categoryId = '';
  expect(await getCategoryService(categoryId)).toStrictEqual(null);
});
