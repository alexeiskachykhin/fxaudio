/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxChannelMergerUnit extends FxUnit {

        private _ports: FxUnitInterface;


        public get ports(): FxUnitInterface {
            return this._ports;
        }


        constructor(unitContext: FxUnitContext, numerOfInputs: number = 6) {
            super(unitContext);

            var audioGraph: AudioNode[] = this._buildAudioGraph(unitContext, numerOfInputs);
            var audioInterface: FxUnitInterface = this._buildAudioInterface(audioGraph);

            this._ports = audioInterface;
        }


        private _buildAudioGraph(unitContext: FxUnitContext, numberOfChannels: number): AudioNode[] {
            var audioNode: AudioNode = unitContext.audioContext.createChannelMerger(numberOfChannels);
            var audioGraph: AudioNode[] = [audioNode];

            return audioGraph;
        }

        private _buildAudioInterface(audioGraph: AudioNode[]): FxUnitInterface {
            var audioInterface: FxUnitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph(audioGraph);

            return audioInterface;
        }
    }
}
