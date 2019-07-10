var express = require('express');
var router = express.Router();
const SteamService = require('../services/SteamService');
const steam = new SteamService();

/* GET home page. */
router.get('/', function(req, res, next) {
  steam.doRequest({response: res, path: '/ISteamUser/GetPlayerSummaries/v0002/'});
});

/**
 * Get news for app
 * ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json
 */
router.get('/get-news-for-app/:appid/:count/:maxlength', function(req, res, next) {
  let params = Object.assign({format: 'json'}, req.params);
  steam.doRequest({
    response: res,
    path: '/ISteamNews/GetNewsForApp/v0002/',
    params: params
  });
});

/**
 * GetPlayerSummaries
 */
router.get('/get-player-summaries/:playerId*?', function(req, res, next) {
  const playerId = req.params.hasOwnProperty('playerId') && !!req.params.playerId ? req.params.playerId : null;
  steam.doRequest({
    response: res,
    path: '/ISteamUser/GetPlayerSummaries/v0002/',
    params: {
      key: null,
      steamids: playerId
    }
  });
});

module.exports = router;
