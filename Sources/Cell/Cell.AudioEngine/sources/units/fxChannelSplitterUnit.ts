 /// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxChannelSplitterUnit extends FxUnit<FxChannelSplitterUnitBuilder> {

        constructor(unitContext: FxUnitContext, numberOfOutputs: number = 6) {
            super(unitContext, new FxChannelSplitterUnitBuilder(numberOfOutputs));
        }
    }


    export class FxChannelSplitterUnitBuilder extends FxAdapterUnitBuilder<ChannelSplitterNode> {

        constructor(numberOfOutputs: number) {
            super(NodeType.CHANNEL_SPLITTER, numberOfOutputs);
        }
    }
}
