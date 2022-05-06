import Category from '../../models/category.model';

const getCategoriesService = async (categoriesType: string) => {
  const categories = await Category.findAll({
    where: { name: categoriesType },
  });
  return categories;
};

export default getCategoriesService;
