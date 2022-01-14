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
const getAllProductsQuery = 'SELECT category, id, name, default_price::text, slogan, description FROM product LIMIT 5';
const getProductInfoQuery = 'SELECT category, id, name, default_price::text, slogan, description FROM product WHERE id = $1';
const getStylesInfoQuery = 'SELECT "id", "name", "sale_price", "original_price", "isDefault" FROM styles WHERE product_id = $1';



// ---------- models to export to server ? ------
module.exports = {
  getProducts: function(cb) {
    pool.query(getAllProductsQuery, function(err, results) {
      cb(err, results);
    });
  },
  getProductInfo: function(params, cb) {
    let holder;
    if (params[0] === 'null') {
      holder = [1];
      pool.query(getProductInfoQuery, holder, function(err, results) {
        console.log('these the getproductInfo results', results.rows);
        cb(err, results);
      });
    } else {
      pool.query(getProductInfoQuery, params, function(err, results) {
        console.log('these the getproductInfo results', results.rows);
        cb(err, results);
      });
    }
  },
  getAllStyles: function(params, cb) {
    pool.query(getStylesInfoQuery, params, function(err, result) {
      // console.log('these the getAllStyles results', results);
      cb(err, results);
    });
  }

};
