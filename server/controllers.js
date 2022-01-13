var models = require('./sglDB/db.js');

module.exports = {

  getAllProduct: function (req, res) {
    models.getProducts((err, results) => {
      if (err) {
        console.log('oops, having trouble contacting database:::', err);
        res.sendStatus(500);
      } else {
        // console.log('these are the new results', results.rows);
        res.status(200).send(results.rows);
      }
    });
  },
  getProductInfo: function(reg, res) {
    let params = [reg.params.product_id];
    models.getProductInfo(params, (err, results) => {
      if (err) {
        console.log('problem getting a products info', err);
      } else {
        console.log('these are the products infos:::', params, results);
        res.status(200).send(results.rows[0]);
      }
    });
  },
  getAllStyles: function(reg, res) {
    let params = [reg.params.product_id];
    models.getAllStyles(params, (err, results) => {
      if (err) {
        console.log('problem getting product styles info', err);
      } else {
        // test this data to make sure it matchs what the api wants
        console.log('these ate the product style::::', results);
        res.status(200).send(results);
      }
    });
  },

};

// get products returns an object just for results. but results.rows is an array of objects: id, slogan, description, category,default_price

// old get to products array of objeccts with id, campus, name, slogan, description, category, default_price, created_at, updated_at


//