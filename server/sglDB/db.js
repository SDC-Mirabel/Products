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
const featuresQuery = 'SELECT feature, value FROM features WHERE product_id = $1';
const stylesQuery2 = 'SELECT "style_id", "name", "original_price", CASE WHEN "sale_price" = null THEN null END AS "sale_price", ( select json_agg(photos) FROM (SELECT "thumbnail_url", "url" FROM photos WHERE "styleId" = styles.style_id) photos ) AS "photos", (select json_agg(skus) FROM (SELECT "id", "size", "quantity" FROM skus WHERE "styleId" = styles.style_id) skus ) AS "skus" FROM styles WHERE "product_id" = $1';
const getRelatedQuery = 'SELECT related_product_id FROM related WHERE "current_product_id" = $1';


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
        pool.query(featuresQuery, holder, (err2, result) => {
          data.features = result.rows;
          // console.log('2::', data);
          cb(err1 || err2, data);
        });
      });
    } else {
      let data;
      pool.query(getProductInfoQuery, params, function(err1, results) {
        data = results.rows[0];
        pool.query(featuresQuery, params, (err2, result) => {
          data.features = result.rows;
          // console.log('2::', data);
          cb(err1 || err2, data);
        });
      });
    }
  },
  getAllStyles: function(params, cb) {
    if (params[0] === 'null') {
      return;
    } else {
      pool.query(stylesQuery2, params, function(err, results) {
        let fullResults = {
          'product_id': params[0] + '',
          results: results.rows
        };

        fullResults.results.forEach((result) => {
          result.holder = {};
          result.skus.forEach((sku) => {
            result.holder[sku.id] = {'quantity': sku.quantity, 'size': sku.size};
          });
          result.skus = result.holder;
          result.holder = undefined;
        });

        cb(err, fullResults);
      });

    }
  },
  getAllRelated: function(params, cb) {
    pool.query(getRelatedQuery, params, function(err, results) {
      let newResults = [];
      results.rows.forEach((row) => {
        newResults.push(row.related_product_id);
      });
      console.log('these the related db results', newResults);
      cb(err, newResults);
    });
  }

};
