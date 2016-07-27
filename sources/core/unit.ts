/// <reference path="../_references.ts" />


module FXAudio {
    'use strict';


    export class Unit<TCircuit extends Circuit> {

        private _ports: UnitInterface;

        private _circuit: TCircuit;


        public get ports(): UnitInterface {
            return this._ports;
        }

        public get circuit(): TCircuit {
            return this._circuit;
        }

        public get context(): Context {
            return this._circuit.context;
        }


        constructor(circuit: TCircuit) {
            Contract.isNotNullOrUndefined(circuit, 'circuit');

            var audioInterface = new UnitInterface(circuit.inputs, circuit.outputs);

            this._ports = audioInterface;
            this._circuit = circuit;
        }
    }
}
