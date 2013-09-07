module FxAudioEngine.Nodes.Source {
    'use strict';


    export enum FxAudioStreamingState {
        PLAYING = 0,
        STOPPED = 1,
        PAUSED = 2,
        AWAITING = 3
    };


    export interface IFxAudioStreamingController {

        state: FxAudioStreamingState;

        canStart: boolean;

        canStop: boolean;

        canRewind: boolean;

        time: number;


        start(when: number): void;

        stop(when: number): void;
    }
}