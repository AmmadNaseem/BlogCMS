var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'CMS Api Learning' });
});

module.exports = router;
