/// <reference path="../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAudioDestinationUnit extends FxUnit<FxAudioDestinationCircuit> {

        public get maxChannelCount(): number {
            return this.circuit.audioNode.maxNumberOfChannels;
        }


        constructor(context: FxRealTimeContext) {
            super(new FxAudioDestinationCircuit(context));
        }
    }
}
