/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxAudioDestinationUnit extends FxUnit {

        private _audioDestinationNode: AudioDestinationNode;

        private _ports: FxUnitInterface;


        public get ports(): FxUnitInterface {
            return this._ports;
        }


        public get maxChannelCount(): number {
            return this._audioDestinationNode.maxNumberOfChannels;
        }


        constructor(context: FxRealTimeUnitContext) {
            super(context);

            this._audioDestinationNode = context.audioContext.destination;

            this._ports = this._buildInterface();
        }


        private _buildInterface(): FxUnitInterface {
            var ports: FxUnitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph([this._audioDestinationNode]);

            return ports;
        }
    }
}
