/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    declare var window: any;


    var AudioContext =
        window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext;


    export class FxRealTimeContext extends FxContext {

        constructor() {
            super(new AudioContext());
        }
    }
}
