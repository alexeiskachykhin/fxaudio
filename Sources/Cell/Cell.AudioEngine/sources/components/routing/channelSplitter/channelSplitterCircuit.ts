 /// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class ChannelSplitterCircuit extends AdapterCircuit<ChannelSplitterNode> {

        constructor(context: Context, numberOfOutputs: number) {
            super(context, NodeType.CHANNEL_SPLITTER, numberOfOutputs);
        }
    }
}
