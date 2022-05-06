import { Sequelize } from 'sequelize';

import { DB_CONNECTION_URI } from '../consts/secret.const';

const databaseConnectionUri = String(
  DB_CONNECTION_URI ||
    'postgres://flcwovnp:6L9T8oV4AyNDUAbtnmWDgBBlx-ZjTd4a@tyke.db.elephantsql.com/flcwovnp'
);
const sequelize = new Sequelize(databaseConnectionUri);

export default sequelize;
