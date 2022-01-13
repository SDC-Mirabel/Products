var router = require('express').Router();
var controllers = require('./controllers.js');

router.get('/*', controllers.getAllProduct);
// router.get('/*', controller.getAll);





module.exports = router;