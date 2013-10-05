/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxNetworkAudioSourceController implements IFxAudioSourceController {

        private _state: FxAudioSourceState = FxAudioSourceState.AWAITING;

        private _mediaElement: HTMLMediaElement;


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
            return true;
        }

        public get time(): number {
            return this._mediaElement.currentTime;
        }

        public set time(value: number) {
            this._mediaElement.currentTime = value;
        }


        constructor(mediaElement: HTMLMediaElement) {
            this._mediaElement = mediaElement;
        }


        public start(when: number): void {
            this._mediaElement.play();
            this._state = FxAudioSourceState.PLAYING;
        }

        public stop(when: number): void {
            this._mediaElement.pause();
            this._state = FxAudioSourceState.STOPPED;
        }
    }
}
