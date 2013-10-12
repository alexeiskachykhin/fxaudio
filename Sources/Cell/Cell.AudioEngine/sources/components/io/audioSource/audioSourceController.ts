/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export enum AudioSourceState {
        PLAYING = 0,
        STOPPED = 1,
        PAUSED = 2,
        AWAITING = 3
    };


    export interface IAudioSourceController {

        state: AudioSourceState;

        canStart: boolean;

        canStop: boolean;

        canRewind: boolean;

        time: number;


        start(when: number): void;

        stop(when: number): void;
    }
}
