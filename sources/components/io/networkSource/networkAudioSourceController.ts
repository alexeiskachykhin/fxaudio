/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    export class NetworkAudioSourceController implements IAudioSourceController {

        private _state: AudioSourceState = AudioSourceState.AWAITING;

        private _mediaElement: HTMLMediaElement;


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
            return true;
        }

        public get time(): number {
            return this._mediaElement.currentTime;
        }

        public set time(value: number) {
            this._mediaElement.currentTime = value;
        }


        constructor(mediaElement: HTMLMediaElement) {
            Contract.isNotNullOrUndefined(mediaElement, 'mediaElement');

            this._mediaElement = mediaElement;
        }


        public start(when: number): void {
            Contract.isPositiveOrZero(when, 'when');

            this._mediaElement.play();
            this._state = AudioSourceState.PLAYING;
        }

        public stop(when: number): void {
            Contract.isPositiveOrZero(when, 'when');

            this._mediaElement.pause();
            this._state = AudioSourceState.STOPPED;
        }
    }
}
