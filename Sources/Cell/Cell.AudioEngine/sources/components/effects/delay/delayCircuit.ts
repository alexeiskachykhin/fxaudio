/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class DelayCircuit extends AdapterCircuit<DelayNode> {

        constructor(context: Context, maxDelayTime: number) {
            super(context, NodeType.DELAY, maxDelayTime);
        }
    }
}
