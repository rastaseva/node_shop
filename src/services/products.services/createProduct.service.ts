import Product from '../../models/product.model';

const createProductService = async (
  name: string,
  slug: string,
  price: string,
  description: string,
  image: string,
  author: string
) => {
  await Product.create({
    name,
    slug,
    price,
    description,
    image,
    author,
  });
};

export default createProductService;
