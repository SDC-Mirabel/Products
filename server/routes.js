var router = require('express').Router();
var controllers = require('./controllers.js');

router.get('/', controllers.getAllProduct);
router.get('/:product_id', controllers.getProductInfo);
router.get('/products/:product_id/styles', controllers.getAllStyles);






module.exports = router;