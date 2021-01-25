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
  
  keys = Object.keys(req.body.rss)
  keysToRemove =[]
  keys.forEach((key) => {
    if (req.body.rss[key]=== '' || req.body.rss[key]=== ' ' ){
      req.results = "missing url " + key
      next()
    }
  })

  // req.results = activity.getActivity(req.body.rss, req.body.days)
  // req.results= "hello"
  var p3 = new Promise((resolve, reject) => {

      foo = activity.getActivity(req.body.rss, req.body.days).catch((error) => {
        reject(error)
      })
      resolve(foo)

    // console.log("foo"+ foo)
    // resolve(foo)
  });
  
  Promise.all([p3]).then(values => {
    console.log("values", values)
    arr = values[0].filter(v=>v);
    console.log("arr" + arr)
    req.results = arr
    
    next()
  }).catch((error) => {
    reject(error)
    next()
  })
  // res.json({results: "values"});
}, function (req, res, next) {
  res.json({results: req.results});
});


module.exports = router;
