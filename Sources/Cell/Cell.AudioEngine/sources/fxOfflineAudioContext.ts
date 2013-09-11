/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';

    declare var window: any;

    var OfflineAudioContext =
        window.OfflineAudioContext ||
        window.webkitOfflineAudioContext ||
        window.mozOfflineAudioContext;


    export class FxOfflineAudioContext extends FxAudioContext {

        constructor(numberOfChannels: number, length: number, sampleRate: number) {
            super(new OfflineAudioContext(numberOfChannels, length, sampleRate));
        }
    }
}
