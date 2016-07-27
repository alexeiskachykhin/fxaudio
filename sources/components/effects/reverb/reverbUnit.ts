/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class ReverbUnit extends Unit<ReverbCircuit> {

        public get time(): number {
            return this.circuit.getTime();
        }

        public set time(value: number) {
            this.circuit.setTime(value);
        }

        public get decay(): number {
            return this.circuit.getDecay();
        }

        public set decay(value: number) {
            this.circuit.setDecay(value);
        }

        public get level(): number {
            return this.circuit.gainNode.gain.value;
        }

        public set level(value: number) {
            this.circuit.gainNode.gain.value = value;
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(new ReverbCircuit(context));
        }
    }
}
