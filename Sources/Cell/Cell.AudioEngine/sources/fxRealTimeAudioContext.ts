/// <reference path="../libraries/waa.d.ts" />

/// <reference path="fxAudioContext.ts" />


module FxAudioEngine {
    'use strict';

    declare var window: any;

    var AudioContext =
        window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext;


    export class FxRealTimeAudioContext extends FxAudioContext {

        constructor() {
            super(new AudioContext());
        }
    }
}