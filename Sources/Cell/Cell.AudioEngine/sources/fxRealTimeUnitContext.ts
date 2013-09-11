/// <reference path="../libraries/waa.d.ts" />

/// <reference path="fxUnitContext.ts" />


module FxAudioEngine {
    'use strict';

    declare var window: any;

    var AudioContext =
        window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext;


    export class FxRealTimeUnitContext extends FxUnitContext {

        constructor() {
            super(new AudioContext());
        }
    }
}