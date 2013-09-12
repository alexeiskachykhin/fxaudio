/// <reference path="_references.ts" />


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
