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
const test = 'SELECT feature, value FROM features WHERE product_id = $1';
// need to add features to the product info query
// test feature query: SELECT feature, value FROM features WHERE product_id = 1;

/*

this is the styles get response::::
{ product_id: '40351',
  results: [
    {
      style_id: 240536,
      name: 'Zebra Stripe',
      original_price: '900.00',
      sale_price: null,
      'default?': false,
      photos: [Array],
      skus: [Object]
    },
    {
      style_id: 240537,
      name: 'Oreo',
      original_price: '750.00',
      sale_price: null,
      'default?': false,
      photos: [Array],
      skus: [Object]
    },
  }
*/

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
      let data;
      pool.query(getProductInfoQuery, holder, function(err1, results) {
        data = results.rows[0];
        pool.query(test, holder, (err2, result) => {
          data.features = result.rows;
          // console.log('2::', data);
          cb(err1 || err2, data);
        });
      });
    } else {
      let data;
      pool.query(getProductInfoQuery, params, function(err1, results) {
        data = results.rows[0];
        pool.query(test, params, (err2, result) => {
          data.features = result.rows;
          // console.log('2::', data);
          cb(err1 || err2, data);
        });
      });
    }
  },
  getAllStyles: function(params, cb) {
    pool.query(getStylesInfoQuery, params, function(err, result) {
      let fullResults = {

      };
      // console.log('these the getAllStyles results', results);
      cb(err, results);
    });
  }

};
