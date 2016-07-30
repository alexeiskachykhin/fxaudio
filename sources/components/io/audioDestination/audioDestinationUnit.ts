/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    export class AudioDestinationUnit extends Unit<AudioDestinationCircuit> {

        public get maxChannelCount(): number {
            return this.circuit.audioNode.maxNumberOfChannels;
        }


        constructor(context: RealTimeContext) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(new AudioDestinationCircuit(context));
        }
    }
}
