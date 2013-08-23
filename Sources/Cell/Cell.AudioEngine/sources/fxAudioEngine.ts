/// <reference path="../libraries/waa.d.ts" />


module FxAudioEngine {
    'use strict';

    declare var window: any;


    var AudioContext =
        window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext;


    export var context = new AudioContext();
}