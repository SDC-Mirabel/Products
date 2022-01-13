const Pool = require('pg').Pool;
const ps = require('../../dbConfig.js');

const pool = new Pool({
  user: 'postgres',
  password: ps,
  host: 'localhost',
  port: 5432,
  database: 'postgres'
});

// ---- Query Strings --------//
const getAllProductsQuery = 'SELECT * FROM product LIMIT 10';
const getProductInfoQuery = 'SELECT * FROM product WHERE id = $1';



// ---------- models to export to server ? ------
module.exports = {
  getProducts: function(cb) {
    pool.query(getAllProductsQuery, function(err, results) {
      cb(err, results);
    });
  },
  getProductInfo: function(params, cb) {
    pool.query(getProductInfoQuery, params, function(err, results) {
      cb(err, results);
    });
  },
  // build getAllStyles func here // test data matches what api wants

};
