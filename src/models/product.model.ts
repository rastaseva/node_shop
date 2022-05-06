import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.config';

interface ProductInstance extends Model {
  name: string;
  slug: string;
  price: string;
  description: string;
  image: string;
  author: string;
}

const Product = sequelize.define<ProductInstance>('products', {
  name: {
    type: DataTypes.STRING,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  price: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: ' ',
  },
  author: {
    type: DataTypes.STRING,
    defaultValue: ' ',
  },
});

export default Product;
