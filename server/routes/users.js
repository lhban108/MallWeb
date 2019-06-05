var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/811', function(req, res, next) {
  res.send('respond with a 811');
});

module.exports = router;
