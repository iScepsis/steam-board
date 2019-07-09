const http = require("http");

function steamService() {
    this._apiBase = 'http://api.steampowered.com';
    this._id = 76561197998250364;
    this._apiKey = '';
};

steamService.prototype.doRequest = function({response, path}) {
    http.get(this._apiBase + path + '?key=' + this._apiKey + '&steamids=' + this._id, (res) => {
        res.on('data', function (body) {
            response.setHeader('Content-Type', 'application/json');
            response.send(body);
        });
    });
};
module.exports = steamService;