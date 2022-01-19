const Pool = require('pg').Pool;
// const ps = require('../../dbConfig.js');
//ec2 settings
const pool = new Pool({
  user: 'postgres',
  host: '',
  port: 5432,
  database: 'sdc'
});
//local settings
// const pool = new Pool({
//   user: 'postgres',
//   password: ps,
//   host: 'localhost',
//   port: 5432,
//   database: 'postgres'
// });

// ---- Query Strings --------//
const getAllProductsQuery = 'SELECT category, id, name, default_price::text, slogan, description FROM product LIMIT 5';
const getProductInfoQuery = 'SELECT category, id, name, default_price::text, slogan, description FROM product WHERE id = $1';
const getStylesInfoQuery = 'SELECT "id", "name", "sale_price", "original_price", "isDefault" FROM styles WHERE product_id = $1';
const featuresQuery = 'SELECT feature, value FROM features WHERE product_id = $1';
const getRelatedQuery = 'SELECT related_product_id FROM related WHERE "current_product_id" = $1';

const stylesQuery2 = `SELECT s."style_id", s."product_id", "name", s."original_price" , s."default?", CASE WHEN s."sale_price" = null THEN null END AS "sale_price",
json_agg(DISTINCT jsonb_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)) as photos,
jsonb_object_agg(DISTINCT COALESCE(sk.id::VARCHAR, 'null', s.sale_price::VARCHAR, null), jsonb_build_object('quantity', sk.quantity, 'size', sk.size)) as skus
FROM public."styles" as s
LEFT JOIN public."photos" as p ON p."styleId" = s."style_id"
LEFT JOIN public."skus" as sk ON sk."styleId" = s."style_id"
WHERE s."product_id" = $1
GROUP BY s."style_id"`;



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
          cb(err1 || err2, data);
        });
      });
    } else {
      let data;
      pool.query(getProductInfoQuery, params, function(err1, results) {
        data = results.rows[0];
        pool.query(featuresQuery, params, (err2, result) => {
          data.features = result.rows;
          cb(err1 || err2, data);
        });
      });
    }
  },
  getAllStyles: function(params, cb) {
    pool.query(stylesQuery2, params, function(err, results) {
      cb(err, results.rows);
    });

  },
  getAllRelated: function(params, cb) {
    pool.query(getRelatedQuery, params, function(err, results) {
      let newResults = [];
      if (results !== undefined ) {
        results.rows.forEach((row) => {
          newResults.push(row.related_product_id);
        });
      }
      cb(err, newResults);
    });
  }

};
