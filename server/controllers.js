var models = require('./sglDB/db.js');

module.exports = {

  getAllProduct: function (req, res) {
    models.getProducts((err, results) => {
      if (err) {
        console.log('oops, having trouble contacting database:::', err);
        res.sendStatus(500);
      } else {
        console.log('these are the new results', results.rows);
        res.status(200).send(results);
      }
    });
  },
};

// get products returns an object just for results. but results.rows is an array of objects: id, slogan, description, category,default_price

// old get to products array of objeccts with id, campus, name, slogan, description, category, default_price, created_at, updated_at