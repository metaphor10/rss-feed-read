var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({users: [{name: 'Timmy'}]});
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  
  res.json({users: [{name: 'Timmy'}]});
});


module.exports = router;
