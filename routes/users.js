var express = require('express');
var router = express.Router();
const activity = require('../functions/rss.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({users: [{name: 'Timmy'}]});
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  console.log(req.body.rss)
  activity.getActivity(req.body.rss, 9)
  res.json({users: [{name: 'Timmy'}]});
});


module.exports = router;
