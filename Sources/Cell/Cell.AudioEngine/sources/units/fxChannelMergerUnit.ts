/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxChannelMergerUnit extends FxUnit<FxChannelMergerUnitCircuit> {

        constructor(context: FxUnitContext, numberOfInputs: number = 6) {
            super(new FxChannelMergerUnitCircuit(context, numberOfInputs));
        }
    }


    export class FxChannelMergerUnitCircuit extends FxAdapterUnitCircuit<ChannelMergerNode> {

        constructor(context: FxUnitContext, numberOfInputs: number) {
            super(context, NodeType.CHANNEL_MERGER, numberOfInputs);
        }
    }
}
