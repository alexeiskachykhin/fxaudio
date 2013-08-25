/// <reference path="../libraries/waa.d.ts" />

/// <reference path="fxAudioPort.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAudioNodeInterface {

        public inputs: FxAudioPort[];

        public outputs: FxAudioPort[];

        public bypass: FxAudioPort[];



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
                this.inputs = (inputs instanceof Array) ? inputs : [inputs];
                this.outputs = (outputs instanceof Array) ? outputs : [outputs];
                this.bypass = (bypass instanceof Array) ? bypass : [bypass];

                Object.freeze(this.inputs);
                Object.freeze(this.outputs);
                Object.freeze(this.bypass);

                Object.freeze(this);
        }
    }
}