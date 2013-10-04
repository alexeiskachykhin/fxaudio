 /// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxChannelSplitterCircuit extends FxAdapterCircuit<ChannelSplitterNode> {

        constructor(context: FxContext, numberOfOutputs: number) {
            super(context, NodeType.CHANNEL_SPLITTER, numberOfOutputs);
        }
    }
}
