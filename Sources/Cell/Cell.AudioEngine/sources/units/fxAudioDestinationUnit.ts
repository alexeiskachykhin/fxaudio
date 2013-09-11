/// <reference path="../../libraries/waa.d.ts" />

/// <reference path="../fxRealTimeUnitContext.ts" />
/// <reference path="../fxUnit.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxAudioDestinationUnit extends FxUnit {

        private _audioDestinationNode: AudioDestinationNode;


        public get maxChannelCount(): number {
            return this._audioDestinationNode.maxNumberOfChannels;
        }


        constructor(unitContext: FxRealTimeUnitContext) {
            var audioGraph = this._buildAudioGraph(unitContext);

            super(unitContext, audioGraph);
        }


        private _buildAudioGraph(unitContext: FxUnitContext): AudioNode[] {
            var audioDestinationNode: AudioDestinationNode = unitContext.audioContext.destination;
            var audioGraph: AudioNode[] = [audioDestinationNode];

            return audioGraph;
        }
    }
}