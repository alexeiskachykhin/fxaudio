/// <reference path="../libraries/waa.d.ts" />

/// <reference path="fxUnitContext.ts" />


module FxAudioEngine {
    'use strict';

    declare var window: any;

    var OfflineAudioContext =
        window.OfflineAudioContext ||
        window.webkitOfflineAudioContext ||
        window.mozOfflineAudioContext;


    export class FxOfflineUnitContext extends FxUnitContext {

        constructor(numberOfChannels: number, length: number, sampleRate: number) {
            super(new OfflineAudioContext(numberOfChannels, length, sampleRate));
        }
    }
}