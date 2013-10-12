/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class UnitInterface {

        private _inputs: UnitPort[];

        private _outputs: UnitPort[];


        public get inputs() {
            return this._inputs;
        }

        public get outputs() {
            return this._outputs;
        }


        constructor(inputs: UnitPort[], outputs: UnitPort[]) {
            this._inputs = inputs;
            this._outputs = outputs;
        }
    }
}
