/// <reference path="../libraries/waa.d.ts" />

/// <reference path="fxAudioPort.ts" />
/// <reference path="fxAudioNodeInterface.ts" />
/// <reference path="fxAudioEventSource.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAudioNode {

        private _audioInterface: FxAudioNodeInterface;

        private _audioGraph: AudioNode[];


        public get ports(): FxAudioNodeInterface {
            return this._audioInterface;
        }


        constructor(
            audioGraph: AudioNode[],
            audioInterface?: FxAudioNodeInterface,
            autoRoute: boolean = true) {
                this._setAudioNodeInternals(audioGraph, audioInterface, autoRoute);
        }


        private _setAudioNodeInternals(audioGraph: AudioNode[], audioInterface?: FxAudioNodeInterface, autoRoute: boolean = true) {
            if (autoRoute) {
                FxAudioUtilities.WebAudioAPI.routeAudioGraph(audioGraph);
            }

            if (!audioInterface) {
                audioInterface = FxAudioUtilities.AudioInterface.fromAudioGraph(audioGraph);
            }

            this._audioGraph = audioGraph;
            this._audioInterface = audioInterface;
        }
    }
}