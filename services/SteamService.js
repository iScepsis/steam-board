const http = require("http");
const config = require('../config');

function SteamService() {
    this._apiBase = 'http://api.steampowered.com';

    this.defaultProps = {
        key: config.get('steamkey'),
        steamids: config.get('steamid')
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
    response.setHeader('Content-Type', 'application/json');
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
    resBody = '';
    http.get(url, (res) => {
        res.on('data', function (chunk) {
            resBody += chunk.toString();
        }).on("end", function(){
            response.send(resBody);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        response.send({result: false, errMessage: err.message});
    });
};
module.exports = SteamService;