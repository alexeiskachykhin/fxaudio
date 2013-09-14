/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxChannelSplitterUnit extends FxUnit {
	
        constructor(unitContext: FxUnitContext, numberOfOutputs: number = 6) {
            var audioGraph: AudioNode[] = this._buildAudioGraph(unitContext, numberOfOutputs);
            var audioInterface: FxUnitInterface = this._buildAudioInterface(audioGraph);

            super(unitContext, audioGraph, audioInterface);
        }


        private _buildAudioGraph(unitContext: FxUnitContext, numberOfChannels: number): AudioNode[] {
            var audioNode: AudioNode = unitContext.audioContext.createChannelSplitter(numberOfChannels);
            var audioGraph: AudioNode[] = [audioNode];

            return audioGraph;
        }

        private _buildAudioInterface(audioGraph: AudioNode[]): FxUnitInterface {
            var audioInterface = FxAudioUtilities.AudioInterface.fromAudioGraph(audioGraph);

            return audioInterface;
        }
    }
}
