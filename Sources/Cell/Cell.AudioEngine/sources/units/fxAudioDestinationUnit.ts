/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxAudioDestinationUnit extends FxUnit {

        private _audioDestinationNode: AudioDestinationNode;


        public get maxChannelCount(): number {
            return this._audioDestinationNode.maxNumberOfChannels;
        }


        constructor(unitContext: FxRealTimeUnitContext) {
            super(unitContext);

            this._audioDestinationNode = unitContext.audioContext.destination;

            this._unitInterface = this._buildUnitInterface();
        }


        private _buildUnitInterface(): FxUnitInterface {
            var unitInterface: FxUnitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph([this._audioDestinationNode]);

            return unitInterface;
        }
    }
}
