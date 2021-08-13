var createError = require('http-errors');
var Math = require('mathjs')
var express = require('express');
var router = express.Router();

var accounts = [
  {name: 'default', id: 0},
  {name: 'second', id: 1}
]

/* GET accounts listing. */
router.get('/', function(req, res) {
  res.send(accounts);
});

/* GET account. */
router.get(`/:account`, function(req, res, next) {
  var name = req.params.account
  var id = accounts.map(function(account) {
    if (account.name === name) {
      return account.id;
    }
  });
  res.send(`${id}`);
});

/* Check that account doesn't already exist and get max id from existing accounts */
router.post(`/:account`, function(req, res, next) {
  var account = req.params.account
  accounts.forEach(a => {
    console.log(a.name, account)
    if (a.name == account) {
      console.log("this should throw an error")
      return res.status(500).json({ error: `${account} already exists!` })
    }
  })
  var newId = Math.max.apply(Math, accounts.map(function(a){ return a.id }));
  next(res.send(newId.toString()))
  // next()
});

/* Create new account using max id + 1 */
// router.post(`/:account`, function(req, res, next)) {
//
// }

module.exports = router;
