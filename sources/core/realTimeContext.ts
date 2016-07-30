/// <reference path="../_references.ts" />


namespace FXAudio {
    'use strict';


    declare var window: any;


    var AudioContext =
        window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext;


    export class RealTimeContext extends Context {

        constructor() {
            super(new AudioContext());
        }
    }
}
