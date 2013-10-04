/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    declare var window: any;


    var OfflineAudioContext =
        window.OfflineAudioContext ||
        window.webkitOfflineAudioContext ||
        window.mozOfflineAudioContext;


    export class FxOfflineContext extends FxContext {

        constructor(numberOfChannels: number, length: number, sampleRate: number) {
            super(new OfflineAudioContext(numberOfChannels, length, sampleRate));
        }
    }
}

