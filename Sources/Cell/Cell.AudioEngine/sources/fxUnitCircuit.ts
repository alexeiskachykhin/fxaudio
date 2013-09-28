/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxUnitCircuit {

        private _context: FxUnitContext;

        private _inputs: AudioNode[];

        private _outputs: AudioNode[];


        public get context(): FxUnitContext {
            return this._context;
        }

        public get inputs(): AudioNode[] {
            return this._inputs;
        }

        public get outputs(): AudioNode[] {
            return this._outputs;
        }


        constructor(context: FxUnitContext) {
            this._context = context;

            this._inputs = [];
            this._outputs = [];
        }


        public _addInputNode(audioNode: AudioNode): void {
            this._inputs.push(audioNode);
        }

        public _addOutputNode(audioNode: AudioNode): void {
            this._outputs.push(audioNode);
        }
    }
}
