/// <reference path="../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxLiveInputAudioSourceController implements IFxAudioSourceController {

        private _state: FxAudioSourceState = FxAudioSourceState.AWAITING;


        public get state(): FxAudioSourceState {
            return this._state;
        }

        public get canStart(): boolean {
            return false;
        }

        public get canStop(): boolean {
            return false;
        }

        public get canRewind(): boolean {
            return false;
        }

        public time: number;


        public start(when: number): void {
            this._state = FxAudioSourceState.PLAYING;
        }

        public stop(when: number): void {
            throw new Error('Not supported.');
        }
    }
}
