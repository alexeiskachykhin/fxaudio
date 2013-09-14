(function (global) {
    'use strict';


    if (!global.hasOwnProperty('URL')) {
        global.URL = global.webkitURL;
    }

    if (!global.hasOwnProperty('AudioContext')) {
        global.AudioContext =
            global.webkitAudioContext ||
            global.mozAudioContext;
    }

    if (!navigator.hasOwnProperty('getUserMedia')) {
        navigator.getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;
    }

}(this));