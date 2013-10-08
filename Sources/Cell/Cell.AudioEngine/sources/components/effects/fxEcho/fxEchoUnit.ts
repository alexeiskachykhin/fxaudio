/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxEchoUnit extends FxUnit<FxEchoCircuit> {

        public get delayTime(): number {
            return this.circuit.delayNode.delayTime.value;
        }

        public set delayTime(value: number) {
            this.circuit.delayNode.delayTime.value = value;
        }

        public get feedbackGain(): number {
            return this.circuit.feedbackGainNode.gain.value;
        }

        public set feedbackGain(value: number) {
            this.circuit.feedbackGainNode.gain.value = value;
        }

        public get echoGain(): number {
            return this.circuit.echoGainNode.gain.value;
        }

        public set echoGain(value: number) {
            this.circuit.echoGainNode.gain.value = value;
        }


        constructor(context: FxContext, maxDelayTime: number = 1.0) {
            super(new FxEchoCircuit(context, maxDelayTime));
        }
    }
}
