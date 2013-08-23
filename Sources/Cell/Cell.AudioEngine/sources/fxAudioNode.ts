/// <reference path="../libraries/waa.d.ts" />

/// <reference path="fxAudioPort.ts" />
/// <reference path="fxAudioNodeInterface.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAudioNode {

        private _audioInterface: FxAudioNodeInterface;

        private _audioGraph: AudioNode[];


        public _setAudioNodeInternals(audioGraph: AudioNode[], audioInterface: FxAudioNodeInterface) {
            FxAudioUtilities.WebAudioAPI.routeAudioGraph(audioGraph);

            this._audioGraph = audioGraph;
            this._audioInterface = audioInterface;
        }
    }
}