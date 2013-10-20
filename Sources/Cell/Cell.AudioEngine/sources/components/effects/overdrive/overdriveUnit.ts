/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class OverdriveUnit extends Unit<OverdriveCircuit> {

        public get level(): number {
            return this.circuit.gainNode.gain.value;
        }

        public set level(value: number) {
            this.circuit.gainNode.gain.value = value;
        }

        public get tone(): number {
            return this.circuit.lowPassFilterNode.frequency.value;
        }

        public set tone(value: number) {
            this.circuit.lowPassFilterNode.frequency.value = value;
        }

        public get drive(): number {
            return this.circuit.getDrive();
        }

        public set drive(value: number) {
            this.circuit.setDrive(value);
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(new OverdriveCircuit(context));
        }
    }
}
