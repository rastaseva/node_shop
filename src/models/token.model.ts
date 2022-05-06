import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.config';

interface UserInstance extends Model {
  id: number;
  refreshToken: string;
}

const Tokens = sequelize.define<UserInstance>('tokens', {
  refreshToken: {
    type: DataTypes.STRING,
  },
});

export default Tokens;
