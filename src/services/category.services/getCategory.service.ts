import {
  CATEGORY_NOT_FOUND,
  CATEGORY_WAS_FOUND,
} from '../../consts/category.const';
import Category from '../../models/category.model';
import logger from '../../libs/logger';

const getCategoryService = async (categoryId: string) => {
  const category = await Category.findOne({ where: { id: categoryId } });
  logger.info(category ? CATEGORY_WAS_FOUND : CATEGORY_NOT_FOUND);
  return category;
};

export default getCategoryService;
