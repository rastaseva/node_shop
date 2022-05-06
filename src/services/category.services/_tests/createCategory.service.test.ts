import Category from '../../../models/category.model';
import createCategoryService from '../createCategory.service';

jest.mock('../../../models/category.model', () => ({
  create: jest
    .fn()
    .mockImplementation((obj: { name: string; slug: string }) => obj),
}));

describe('createCategory service', () => {
  test('should create category', async () => {
    await createCategoryService('Notebook', 'Asus_Notebook');
    expect(Category.create).toHaveBeenCalledWith({
      name: 'Notebook',
      slug: 'Asus_Notebook',
    });
  });
});
