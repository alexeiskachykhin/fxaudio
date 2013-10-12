/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class BufferAudioSourceController implements IAudioSourceController {

        private _state: AudioSourceState = AudioSourceState.AWAITING;

        private _audioSourceNode: AudioBufferSourceNode;


        public get state(): AudioSourceState {
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
            Contract.isNotNullOrUndefined(audioSourceNode, 'audioSourceNode');

            this._audioSourceNode = audioSourceNode;
        }


        public start(when: number): void {
            Contract.isPositiveOrZero(when, 'when');

            this._audioSourceNode.start(when);
            this._state = AudioSourceState.PLAYING;
        }

        public stop(when: number): void {
            Contract.isPositiveOrZero(when, 'when');

            this._audioSourceNode.stop(when);
            this._state = AudioSourceState.STOPPED;
        }
    }
}
