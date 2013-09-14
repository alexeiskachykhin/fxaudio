/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxAudioDestinationUnit extends FxUnit {

        private _audioDestinationNode: AudioDestinationNode;


        public get maxChannelCount(): number {
            return this._audioDestinationNode.maxNumberOfChannels;
        }


        constructor(unitContext: FxRealTimeUnitContext) {
            var unitInterface: FxUnitInterface = this._buildUnitInterface(unitContext);

            super(unitContext, unitInterface);
        }


        private _buildUnitInterface(unitContext: FxUnitContext): FxUnitInterface {
            this._audioDestinationNode = unitContext.audioContext.destination;

            return FxAudioUtilities.AudioInterface.fromAudioGraph([this._audioDestinationNode]);
        }
    }
}
