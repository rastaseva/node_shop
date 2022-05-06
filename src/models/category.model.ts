import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.config';

interface CategoryInstance extends Model {
  id: number;
  name: string;
  slug: string;
}

const Category = sequelize.define<CategoryInstance>('categories', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Category;
