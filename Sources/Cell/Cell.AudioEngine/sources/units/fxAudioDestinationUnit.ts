/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAudioDestinationUnit extends FxUnit<FxAudioDestinationUnitCircuit> {

        public get maxChannelCount(): number {
            return this.circuit.audioNode.maxNumberOfChannels;
        }


        constructor(context: FxRealTimeUnitContext) {
            super(new FxAudioDestinationUnitCircuit(context));
        }
    }


    export class FxAudioDestinationUnitCircuit extends FxAdapterUnitCircuit<AudioDestinationNode> {

        constructor(context: FxUnitContext) {
            super(context, NodeType.DESTINATION);
        }
    }
}
