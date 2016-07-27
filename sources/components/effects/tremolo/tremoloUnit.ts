/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    var DEFAULT_SPEED = 0.5;
    var DEFAULT_DEPTH = 1;


    export class TremoloUnit extends Unit<TremoloCircuit> {

        public get speed(): number {
            return this.circuit.lfoNode.frequency.value;
        }

        public set speed(value: number) {
            this.circuit.lfoNode.frequency.value = value;
        }

        public get depth(): number {
            return this.circuit.depthNode.gain.value;
        }

        public set depth(value: number) {
            this.circuit.depthNode.gain.value = value;
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(new TremoloCircuit(context));

            this.speed = DEFAULT_SPEED;
            this.depth = DEFAULT_DEPTH;
        }
    }
}
