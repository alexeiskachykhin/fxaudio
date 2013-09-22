/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxChannelMergerUnit extends FxUnit<FxChannelMergerUnitBuilder> {

        constructor(unitContext: FxUnitContext, numberOfInputs: number = 6) {
            super(unitContext, new FxChannelMergerUnitBuilder(numberOfInputs));
        }
    }


    export class FxChannelMergerUnitBuilder extends FxAdapterUnitBuilder<ChannelMergerNode> {

        constructor(numberOfInputs: number) {
            super(NodeType.CHANNEL_MERGER, numberOfInputs);
        }
    }
}
