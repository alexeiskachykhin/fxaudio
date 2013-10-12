/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class ChannelMergerCircuit extends AdapterCircuit<ChannelMergerNode> {

        constructor(context: Context, numberOfInputs: number) {
            super(context, NodeType.CHANNEL_MERGER, numberOfInputs);
        }
    }
}
