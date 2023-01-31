const {Router} = require('express');
const router = Router();
const {getTypes} = require('../controller/Type');

router.route('/').get(getTypes);

module.exports = router;
