 /// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxChannelSplitterUnit extends FxUnit<FxChannelSplitterUnitCircuit> {

        constructor(context: FxUnitContext, numberOfOutputs: number = 6) {
            super(new FxChannelSplitterUnitCircuit(context, numberOfOutputs));
        }
    }


    export class FxChannelSplitterUnitCircuit extends FxAdapterUnitCircuit<ChannelSplitterNode> {

        constructor(context: FxUnitContext, numberOfOutputs: number) {
            super(context, NodeType.CHANNEL_SPLITTER, numberOfOutputs);
        }
    }
}
