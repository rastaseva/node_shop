import Product from '../../models/product.model';

const getProductsService = async () => {
  const products = await Product.findAll();
  return products;
};

export default getProductsService;
