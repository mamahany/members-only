const {Pool} = require('pg');

require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DB_STRING,
  });
  
  pool.connect()
  .then(client => {
    console.log('✅ Connected to PostgreSQL');
    client.release();
  })
  .catch(err => console.error('❌ Error connecting to PostgreSQL', err));

module.exports = pool;
