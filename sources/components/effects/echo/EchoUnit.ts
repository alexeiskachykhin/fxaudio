/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class EchoUnit extends Unit<EchoCircuit> {

        public get delayTime(): number {
            return this.circuit.delayNode.delayTime.value;
        }

        public set delayTime(value: number) {
            this.circuit.delayNode.delayTime.value = value;
        }

        public get feedback(): number {
            return this.circuit.feedbackNode.gain.value;
        }

        public set feedback(value: number) {
            this.circuit.feedbackNode.gain.value = value;
        }

        public get balance(): number {
            return this.circuit.balanceNode.gain.value;
        }

        public set balance(value: number) {
            this.circuit.balanceNode.gain.value = value;
        }


        constructor(context: Context, maxDelayTime: number = 1.0) {
            Contract.isNotNullOrUndefined(context, 'context');
            Contract.isPositiveOrZero(maxDelayTime, 'maxDelayTime');

            super(new EchoCircuit(context, maxDelayTime));
        }
    }
}
