import dotenv from 'dotenv';
import path from 'path';

//process.cwd() to get current path and join .env to get full path
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  default_pass: process.env.DEFAULT_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
};
