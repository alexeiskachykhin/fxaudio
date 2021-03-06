/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    const DEFAULT_DEPTH = 0.002;
    const DEFAULT_SPEED = 0.25;
    const DEFAULT_FEEDBACK = 0.5;
    const DEFAULT_DELAY_TIME = 0.005;


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

            this.delayTime = DEFAULT_DELAY_TIME;
            this.feedback = DEFAULT_FEEDBACK;
            this.depth = DEFAULT_DEPTH;
            this.speed = DEFAULT_SPEED;
        }
    }
}
