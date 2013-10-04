/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxDelayUnit extends FxUnit<FxDelayUnitCircuit> {

        public get time(): number {
            return this.circuit.audioNode.delayTime.value;
        }

        public set time(value: number) {
            this.circuit.audioNode.delayTime.value = value;
        }


        constructor(context: FxUnitContext, maxDelayTime: number = 3.0) {
            super(new FxDelayUnitCircuit(context, maxDelayTime));
        }
    }


    export class FxDelayUnitCircuit extends FxAdapterUnitCircuit<DelayNode> {

        constructor(context: FxUnitContext, maxDelayTime: number) {
            super(context, NodeType.DELAY, maxDelayTime);
        }
    }
}
