const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Use the connection string from .env
});

// Optional: a helper function to query the database
const query = (text, params) => pool.query(text, params);

module.exports = { query };
 