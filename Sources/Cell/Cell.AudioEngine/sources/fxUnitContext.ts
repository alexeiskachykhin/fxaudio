/// <reference path="../libraries/waa.d.ts" />


module FxAudioEngine {
    'use strict';


    export class FxUnitContext {

        public _audioContext: AudioContext;


        public get audioContext(): AudioContext {
            return this._audioContext;
        }

        public get sampleRate(): number {
            return this._audioContext.sampleRate;
        }

        public get currentTime(): number {
            return this._audioContext.currentTime;
        }


        constructor(audioContext: AudioContext) {
            this._audioContext = audioContext;
        }
    }
}