/// <reference path="../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxBufferAudioSourceController implements IFxAudioSourceController {

        private _state: FxAudioSourceState = FxAudioSourceState.AWAITING;

        private _audioSourceNode: AudioBufferSourceNode;


        public get state(): FxAudioSourceState {
            return this._state;
        }

        public get canStart(): boolean {
            return true;
        }

        public get canStop(): boolean {
            return true;
        }

        public get canRewind(): boolean {
            return false;
        }

        public time: number;


        constructor(audioSourceNode: AudioBufferSourceNode) {
            this._audioSourceNode = audioSourceNode;
        }


        public start(when: number): void {
            this._audioSourceNode.start(when);
            this._state = FxAudioSourceState.PLAYING;
        }

        public stop(when: number): void {
            this._audioSourceNode.stop(when);
            this._state = FxAudioSourceState.STOPPED;
        }
    }
}
