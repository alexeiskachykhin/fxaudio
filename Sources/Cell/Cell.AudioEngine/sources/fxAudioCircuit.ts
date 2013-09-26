/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAudioCircuit {

        private _inputs: AudioNode[];

        private _outputs: AudioNode[];


        public get inputs(): AudioNode[] {
            return this._inputs;
        }

        public get outputs(): AudioNode[] {
            return this._outputs;
        }


        constructor(input: AudioNode, output: AudioNode);

        constructor(inputs: AudioNode[], outputs: AudioNode[]);

        constructor(inputs: any, outputs: any) {
            this._inputs = (inputs instanceof Array) ? inputs : [inputs];
            this._outputs = (outputs instanceof Array) ? outputs : [outputs];
        }
    }
}
