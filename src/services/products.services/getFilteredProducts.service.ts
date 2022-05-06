import Product from '../../models/product.model';

const getFilteredProductsService = async (productLetter: string) => {
  const products = await Product.findAll();
  const result = products
    .filter((el) => el.name !== null)
    .filter((el) => el.name[0].toLowerCase() === productLetter.toLowerCase());

  return result;
};

export default getFilteredProductsService;
