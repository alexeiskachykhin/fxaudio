/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxDelayCircuit extends FxAdapterCircuit<DelayNode> {

        constructor(context: FxContext, maxDelayTime: number) {
            super(context, NodeType.DELAY, maxDelayTime);
        }
    }
}
