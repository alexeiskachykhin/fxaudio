/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxAudioDestinationUnit extends FxUnit<FxAudioDestinationUnitBuilder> {

        public get maxChannelCount(): number {
            return this.builder.audioNode.maxNumberOfChannels;
        }


        constructor(context: FxRealTimeUnitContext) {
            super(context, new FxAudioDestinationUnitBuilder());
        }
    }


    export class FxAudioDestinationUnitBuilder extends FxAdapterUnitBuilder<AudioDestinationNode> {

        constructor() {
            super(NodeType.DESTINATION);
        }
    }
}
