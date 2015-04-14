var fs = require('fs');
var watch = require('node-watch');
var tinylr = require('tiny-lr');

var _server = tinylr({
    auto: true
});
var _isLiveReloadReady;

function _listen() {
    _server.listen(35729, function(err) {
        if(err) {
            console.log('liveReload is not working');
            _isLiveReloadReady = false;
            return;
        }
        _isLiveReloadReady = true;
        console.log('... Listening on %s (pid: %s) ...', 35729);
    });
}


function _reload(path) {
    if(_isLiveReloadReady) {
        _server.changed({ body: { files: [path] } });
        console.log('reloaded');
    } else {
        _listen();
    }
}


function _watch() {

    watch('./', function(filename) {
        _reload(filename);
    });
}

_listen();
_watch();
