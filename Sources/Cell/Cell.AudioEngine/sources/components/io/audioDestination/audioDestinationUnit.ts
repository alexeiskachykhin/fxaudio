/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class AudioDestinationUnit extends Unit<AudioDestinationCircuit> {

        public get maxChannelCount(): number {
            return this.circuit.audioNode.maxNumberOfChannels;
        }


        constructor(context: RealTimeContext) {
            super(new AudioDestinationCircuit(context));
        }
    }
}
