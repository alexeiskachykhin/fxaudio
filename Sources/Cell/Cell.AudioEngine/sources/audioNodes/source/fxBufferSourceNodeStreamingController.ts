/// <reference path="../../../libraries/waa.d.ts" />

/// <reference path="fxAudioStreamingController.ts" />


module FxAudioEngine.Nodes.Source {
    'use strict';


    export class FxBufferSourceNodeStreamingController implements IFxAudioStreamingController {

        private _state: FxAudioStreamingState = FxAudioStreamingState.AWAITING;

        private _audioSourceNode: AudioBufferSourceNode;


        public get state(): FxAudioStreamingState {
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
            this._state = FxAudioStreamingState.PLAYING;
        }

        public stop(when: number): void {
            this._audioSourceNode.stop(when);
            this._state = FxAudioStreamingState.STOPPED;
        }
    }
}