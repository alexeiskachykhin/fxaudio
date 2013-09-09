/// <reference path="../libraries/waa.d.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAudioContext {

        public _audioContext: AudioContext;


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