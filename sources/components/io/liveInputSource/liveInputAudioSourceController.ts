/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    export class LiveInputAudioSourceController implements IAudioSourceController {

        private _state: AudioSourceState = AudioSourceState.AWAITING;


        public get state(): AudioSourceState {
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
            Contract.isPositiveOrZero(when, 'when');

            this._state = AudioSourceState.PLAYING;
        }

        public stop(when: number): void {
            throw Errors.invalidOperation();
        }
    }
}
