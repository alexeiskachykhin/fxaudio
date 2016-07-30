/// <reference path="../_references.ts" />


namespace FXAudio {
    'use strict';


    export class Context {

        private _audioContext: AudioContext;


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
            Contract.isNotNullOrUndefined(audioContext, 'audioContext');

            this._audioContext = audioContext;
        }
    }
}

