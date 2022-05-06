import Product from '../../models/product.model';

const sortProductsService = async (sortType: string) => {
  const products = await Product.findAll();
  let result;

  if (sortType === 'name') {
    result = products.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
  }
  if (sortType === 'price') {
    result = products.sort((a: any, b: any) =>
      parseInt(a.price, 10) > parseInt(b.price, 10) ? 1 : -1
    );
  }
  return result;
};

export default sortProductsService;
