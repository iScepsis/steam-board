var express = require('express');
var router = express.Router();
const steamService = require('../services/steamService');
const steam = new steamService();

/* GET home page. */
router.get('/', function(req, res, next) {
  steam.doRequest({response: res, path: '/ISteamUser/GetPlayerSummaries/v0002/'});
});

module.exports = router;
