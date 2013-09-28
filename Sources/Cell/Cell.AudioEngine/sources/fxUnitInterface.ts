/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxUnitInterface {

        private _inputs: FxUnitPort[];

        private _outputs: FxUnitPort[];


        public get inputs() {
            return this._inputs;
        }

        public get outputs() {
            return this._outputs;
        }


        constructor(inputs: FxUnitPort[], outputs: FxUnitPort[]) {
            this._inputs = inputs;
            this._outputs = outputs;
        }
    }
}
