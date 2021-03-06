/// <reference path="../_references.ts" />


namespace FXAudio {
    'use strict';


    declare const window: any;


    var OfflineAudioContext =
        window.OfflineAudioContext ||
        window.webkitOfflineAudioContext ||
        window.mozOfflineAudioContext;


    export class OfflineContext extends Context {

        constructor(numberOfChannels: number, length: number, sampleRate: number) {
            Contract.isPositiveOrZero(numberOfChannels, 'numberOfChannels');
            Contract.isPositiveOrZero(length, 'length');
            Contract.isPositiveOrZero(sampleRate, 'sampleRate');

            super(new OfflineAudioContext(numberOfChannels, length, sampleRate));
        }
    }
}

