/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxUnit<TCircuit extends FxUnitCircuit> {

        private _ports: FxUnitInterface;

        private _circuit: TCircuit;


        public get ports(): FxUnitInterface {
            return this._ports;
        }

        public get circuit(): TCircuit {
            return this._circuit;
        }

        public get context(): FxUnitContext {
            return this._circuit.context;
        }


        constructor(circuit: TCircuit) {
            var audioInterface = new FxUnitInterface(circuit.inputs, circuit.outputs);

            this._ports = audioInterface;
            this._circuit = circuit;
        }
    }
}
