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
  getProductInfo: function(req, res) {
    let params;
    if (req.params.product_id === 'null') {
      params = [40344];
    } else {
      params = [req.params.product_id];
    }
    // console.log('testing:::::', req.params.product_id);

    models.getProductInfo(params, (err, results) => {
      if (err) {
        console.log('problem getting a products info', req.params, err);
        res.sendStatus(500);
      } else {
        // console.log('these are the new products infos:::', params, results);
        res.status(200).send(results);
      }
    });
  },
  getAllStyles: function(req, res) {
    let params;
    if (req.params.product_id === 'null') {
      params = [40344];
    } else {
      params = [req.params.product_id];
    }
    models.getAllStyles(params, (err, results) => {
      if (err) {
        console.log('problem getting product styles info', err);
        res.sendStatus(500);
      } else {
        // console.log('these are the product styles::::', results);
        res.status(200).send(results);
        // console.log('this is the getAllStyles controller response', res);
      }
    });
  },
  getAllRelated: function(req, res) {
    let params;
    if (req.params.product_id === 'null') {
      params = [40344];
    } else {
      params = [req.params.product_id];
    }

    models.getAllRelated(params, (err, results) => {
      if (err) {
        console.log('problem getting related info', err);
        res.sendStatus(500);
      } else {
        res.status(200).send(results);
      }
    });
  }

};

// need to add fetaures toz