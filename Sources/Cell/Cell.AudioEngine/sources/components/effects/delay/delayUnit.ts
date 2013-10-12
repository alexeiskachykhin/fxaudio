/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class DelayUnit extends Unit<DelayCircuit> {

        public get time(): number {
            return this.circuit.audioNode.delayTime.value;
        }

        public set time(value: number) {
            this.circuit.audioNode.delayTime.value = value;
        }


        constructor(context: Context, maxDelayTime: number = 3.0) {
            Contract.isNotNullOrUndefined(context, 'context');
            Contract.isPositiveOrZero(maxDelayTime, 'maxDelayTime');

            super(new DelayCircuit(context, maxDelayTime));
        }
    }
}
