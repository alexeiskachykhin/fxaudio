/// <reference path="../libraries/waa.d.ts" />

/// <reference path="fxAudioPort.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAudioNodeInterface {

        private _inputs: FxAudioPort[];

        private _outputs: FxAudioPort[];

        private _bypass: FxAudioPort[];


        constructor(
            inputs: FxAudioPort[],
            outputs: FxAudioPort[],
            bypass?: FxAudioPort[]) {
            this._inputs = inputs;
            this._outputs = outputs;
            this._bypass = bypass;
        }
    }
}