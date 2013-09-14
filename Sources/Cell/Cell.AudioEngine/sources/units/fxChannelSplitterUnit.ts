/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxChannelSplitterUnit extends FxUnit {

        constructor(unitContext: FxUnitContext, numberOfOutputs: number = 6) {
            super(unitContext);

            var audioGraph: AudioNode[] = this._buildAudioGraph(unitContext, numberOfOutputs);
            var audioInterface: FxUnitInterface = this._buildAudioInterface(audioGraph);

            this._ports = audioInterface;
        }


        private _buildAudioGraph(unitContext: FxUnitContext, numberOfChannels: number): AudioNode[] {
            var audioNode: AudioNode = unitContext.audioContext.createChannelSplitter(numberOfChannels);
            var audioGraph: AudioNode[] = [audioNode];

            return audioGraph;
        }

        private _buildAudioInterface(audioGraph: AudioNode[]): FxUnitInterface {
            var audioInterface: FxUnitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph(audioGraph);

            return audioInterface;
        }
    }
}
