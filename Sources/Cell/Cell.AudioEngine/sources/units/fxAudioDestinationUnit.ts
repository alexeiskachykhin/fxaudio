/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxAudioDestinationUnit extends FxUnit<FxAudioDestinationUnitBuilder> {

        public get maxChannelCount(): number {
            return this.builder.audioDestinationNode.maxNumberOfChannels;
        }


        constructor(context: FxRealTimeUnitContext) {
            super(context, new FxAudioDestinationUnitBuilder());
        }
    }


    export class FxAudioDestinationUnitBuilder extends FxLinearInterfaceUnitBuilder {

        private _audioDestinationNode: AudioDestinationNode;


        public get audioDestinationNode(): AudioDestinationNode {
            return this._audioDestinationNode;
        }


        public buildAudioGraph(unitContext: FxUnitContext): AudioNode[] {
            var audioNode: AudioDestinationNode = unitContext.audioContext.destination;
            var audioGraph: AudioNode[] = [audioNode];

            this._audioDestinationNode = audioNode;

            return audioGraph;
        }
    }
}
