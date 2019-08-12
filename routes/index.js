const express = require('express');
const router = express.Router();
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
 * GetGlobalAchievementPercentagesForApp
 * ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=440&format=xml
 */
router.get('/get-global-achievement-percentages-for-app/:gameid', function(req, res, next) {
  let params = Object.assign({format: 'json'}, req.params);
  steam.doRequest({
    response: res,
    path: '/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/',
    params: params
  });
});

/**
 * GetGlobalStatsForGame
 * ISteamUserStats/GetGlobalStatsForGame/v0001/?format=xml&appid=17740&count=1&name[0]=global.map.emp_isle
 */
router.get('/get-global-stats-for-game/:appid/:count/:name', function(req, res, next) {
  let params = Object.assign({format: 'json'}, req.params);
  steam.doRequest({
    response: res,
    path: '/ISteamUserStats/GetGlobalStatsForGame/v0001/',
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

/**
 * GetFriendList
 *  ISteamUser/GetFriendList/v0001/?key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=76561197960435530&relationship=friend
 */
router.get('/get-friend-list/:steamid/:relationship', function(req, res, next) {
  let params = Object.assign({format: 'json', key: null}, req.params);
  steam.doRequest({
    response: res,
    path: '/ISteamUser/GetFriendList/v0001/',
    params: params
  });
});

/**
 * GetPlayerAchievements
 * ISteamUserStats/GetPlayerAchievements/v0001/?appid=440&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=76561197972495328
 */
router.get('/get-player-achievements/:appid/:steamid', function(req, res, next) {
  let params = Object.assign({key: null}, req.params);
  steam.doRequest({
    response: res,
    path: '/ISteamUserStats/GetPlayerAchievements/v0001/',
    params: params
  });
});

/**
 * GetUserStatsForGame
 * ISteamUserStats/GetUserStatsForGame/v0002/?appid=440&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=76561197972495328
 */
router.get('/get-user-stats-for-game/:appid/:steamid', function(req, res, next) {
  let params = Object.assign({key: null}, req.params);
  steam.doRequest({
    response: res,
    path: '/ISteamUserStats/GetUserStatsForGame/v0002/',
    params: params
  });
});

/**
 * GetOwnedGames
 * IPlayerService/GetOwnedGames/v0001/?key=XXXXXXXXXXXXXXXXX&steamid=76561197960434622&format=json
 */
router.get('/get-owned-games/:steamid', function(req, res, next) {
  let params = Object.assign({format: 'json', key: null}, req.params);
  steam.doRequest({
    response: res,
    path: '/IPlayerService/GetOwnedGames/v0001/',
    params: params
  });
});

/**
 * GetRecentlyPlayedGames
 * IPlayerService/GetRecentlyPlayedGames/v0001/?key=XXXXXXXXXXXXXXXXX&steamid=76561197960434622&format=json
 */
router.get('/recently-played-games/:steamid/:count', function(req, res, next) {
  let params = Object.assign({format: 'json', key: null}, req.params);
  steam.doRequest({
    response: res,
    path: '/IPlayerService/GetRecentlyPlayedGames/v0001/',
    params: params
  });
});

module.exports = router;
