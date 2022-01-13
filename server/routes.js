var router = require('express').Router();
var controllers = require('./controllers.js');

router.get('/', controllers.getAllProduct);
router.get('/:product_id', controllers.getProductInfo);
// router.get('/products/:product_id/styles', controller.getAllStyles);
//need to build the model func for getAllStyles before route line 6 works





module.exports = router;