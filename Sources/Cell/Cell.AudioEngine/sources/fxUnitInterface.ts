/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxUnitInterface {

        public inputs: FxUnitPort[];

        public outputs: FxUnitPort[];

        public bypass: FxUnitPort[];


        constructor(
            input: FxUnitPort,
            output: FxUnitPort,
            bypas?: FxUnitPort);

        constructor(
            inputs: FxUnitPort[],
            outputs: FxUnitPort[],
            bypass?: FxUnitPort[]);

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
