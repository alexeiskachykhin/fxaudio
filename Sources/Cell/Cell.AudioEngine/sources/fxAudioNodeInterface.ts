/// <reference path="../libraries/waa.d.ts" />

/// <reference path="fxAudioPort.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAudioNodeInterface {

        private _inputs: FxAudioPort[];

        private _outputs: FxAudioPort[];

        private _bypass: FxAudioPort[];



        constructor(
            inputs: FxAudioPort,
            outputs: FxAudioPort,
            bypass?: FxAudioPort);

        constructor(
            inputs: FxAudioPort[],
            outputs: FxAudioPort[],
            bypass?: FxAudioPort[]);

        constructor(
            inputs: any,
            outputs: any,
            bypass?: any) {
                this._inputs = (inputs instanceof Array) ? inputs : [inputs];
                this._outputs = (outputs instanceof Array) ? outputs : [outputs];
                this._bypass = (bypass instanceof Array) ? bypass : [bypass];
        }
    }
}