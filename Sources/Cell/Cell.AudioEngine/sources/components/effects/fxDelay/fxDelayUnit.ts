/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxDelayUnit extends FxUnit<FxDelayCircuit> {

        public get time(): number {
            return this.circuit.audioNode.delayTime.value;
        }

        public set time(value: number) {
            this.circuit.audioNode.delayTime.value = value;
        }


        constructor(context: FxContext, maxDelayTime: number = 3.0) {
            super(new FxDelayCircuit(context, maxDelayTime));
        }
    }
}
