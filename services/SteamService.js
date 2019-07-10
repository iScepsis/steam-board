const http = require("http");

function SteamService() {
    this._apiBase = 'http://api.steampowered.com';

    this.defaultProps = {
        key: '{key}',
        steamids: 76561197998250364
    }
};

SteamService.prototype._setDefaults = function(props) {
    console.log('props before ', props);
    for (let i in props) {
        if (props[i] === null && this.defaultProps.hasOwnProperty(i) && this.defaultProps[i] !== null) {
            props[i] = this.defaultProps[i];
        }
    }
    console.log('props after ', props);
    return props;
};

SteamService.prototype.doRequest = function({response, path, params = {}}) {
    let url = this._apiBase + path;// + '?key=' + this._apiKey;
    params = this._setDefaults(params);
    let j = 0;
    for (let i in params) {
        let paramPrefix = j === 0 ? '?' : '&';
        j++;
        if (params.hasOwnProperty(i) && !!params[i]) {
            url += paramPrefix + i + '=' + params[i];
        }
    }
    http.get(url, (res) => {
        res.on('data', function (body) {
            response.setHeader('Content-Type', 'application/json');
            response.send(body);
        });
    });
};
module.exports = SteamService;