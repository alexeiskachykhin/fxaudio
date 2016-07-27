/// <reference path="../_references.ts" />


module FXAudio {
    'use strict';

   
    export enum UnitPortDirection {
        INPUT,
        OUTPUT
    }
    

    export class UnitPort {

        private _audioNode: AudioNode;

        private _channel: number;

        private _direction: UnitPortDirection;


        constructor(audioNode: AudioNode, channel: number, direction: UnitPortDirection) {
            Contract.isNotNullOrUndefined(audioNode, 'audioNode');
            Contract.isPositiveOrZero(channel, 'channel');
            Contract.isNotNullOrUndefined(direction, 'direction');

            this._audioNode = audioNode;
            this._direction = direction;
            this._channel = channel;
        }


        public connect(port: UnitPort): void {
            Contract.isNotNullOrUndefined(port, 'port');
            Contract.requires(port._direction === UnitPortDirection.INPUT, 'port');
            Contract.requires(this._direction === UnitPortDirection.OUTPUT, 'port');

            var sourceAudioNode: AudioNode = this._audioNode;
            var destinationAudioNode: AudioNode = port._audioNode;

            sourceAudioNode.connect(destinationAudioNode, this._channel, port._channel);
        }

        public disconnect(): void {
            this._audioNode.disconnect(this._channel);
        }
    }
}
