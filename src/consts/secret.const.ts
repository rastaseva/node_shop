import dotenv = require('dotenv');

dotenv.config();

export const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  DB_CONNECTION_URI,
  MAILSAC_KEY,
  APILAYER_KEY,
  GMAIL_APP_PASSWORD,
} = process.env;
