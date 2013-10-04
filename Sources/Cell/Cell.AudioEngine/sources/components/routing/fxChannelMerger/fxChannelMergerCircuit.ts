/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxChannelMergerCircuit extends FxAdapterCircuit<ChannelMergerNode> {

        constructor(context: FxContext, numberOfInputs: number) {
            super(context, NodeType.CHANNEL_MERGER, numberOfInputs);
        }
    }
}
