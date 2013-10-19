/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FlangerUnit extends Unit<FlangerCircuit> {

        public get speed(): number {
            return this.circuit.lfoNode.frequency.value;
        }

        public set speed(value: number) {
            this.circuit.lfoNode.frequency.value = value;
        }

        public get delayTime(): number {
            return this.circuit.delayNode.delayTime.value;
        }

        public set delayTime(value: number) {
            this.circuit.delayNode.delayTime.value = value;
        }

        public get depth(): number {
            return this.circuit.depthNode.gain.value;
        }

        public set depth(value: number) {
            this.circuit.depthNode.gain.value = value;
        }

        public get feedback(): number {
            return this.circuit.feedbackNode.gain.value;
        }

        public set feedback(value: number) {
            this.circuit.feedbackNode.gain.value = value;
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(new FlangerCircuit(context));
        }
    }
}
