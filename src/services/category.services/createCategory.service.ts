import Category from '../../models/category.model';

const createCategoryService = async (name: string, slug: string) => {
  await Category.create({
    name,
    slug,
  });
};

export default createCategoryService;
