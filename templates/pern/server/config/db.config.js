import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;

const isProduction = process.env.NODE_ENV === 'isProduction';

if (process.env.NODE_ENV === 'isTesting') {
  pool = new Pool({
    connectionString: process.env.TESTING_URL,
  });
} else if (process.env.NODE_ENV === 'isProduction') {
  pool = new Pool({
    connectionString: process.env.PRODUCTION_URL,
    ssl: isProduction,
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

export default pool;
