const Pool = require('pg').Pool;
const { ps } = require('../../config.js');

const pool = new Pool({
  user: 'postgres',
  password: ps,
  host: 'localhost',
  port: 5432,
  database: 'postgres'
});

module.exports = pool;