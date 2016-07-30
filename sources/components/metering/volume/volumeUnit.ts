/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    export class VolumeUnit extends Unit<VolumeCircuit> {

        public get level(): number {
            return this.circuit.audioNode.gain.value;
        }

        public set level(value: number) {
            this.circuit.audioNode.gain.value = value;
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(new VolumeCircuit(context));
        }
    }
}
