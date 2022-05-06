import { DataTypes, Model } from 'sequelize';
import Product from './product.model';
import sequelize from '../db/db.config';

interface UserInstance extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  verifyToken: string;
  recoverToken: string | null;
  isActive: boolean;
}

const User = sequelize.define<UserInstance>('users', {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
  verifyToken: {
    type: DataTypes.STRING,
  },
  recoverToken: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: 'false',
  },
});
export default User;
