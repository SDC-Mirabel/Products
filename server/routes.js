var router = require('express').Router();
var controllers = require('./controllers.js');

router.get('/', controllers.getAllProduct);
router.get('/:product_id', controllers.getProductInfo);
router.get('/:product_id/styles', controllers.getAllStyles);
router.get('/:product_id/related', controllers.getAllRelated);






module.exports = router;