module FxAudioEngine.Nodes.Source {
    'use strict';


    export enum FxAudioSourceState {
        PLAYING = 0,
        STOPPED = 1,
        PAUSED = 2,
        AWAITING = 3
    };


    export interface IFxAudioSourceController {

        state: FxAudioSourceState;

        canStart: boolean;

        canStop: boolean;

        canRewind: boolean;

        time: number;


        start(when: number): void;

        stop(when: number): void;
    }
}