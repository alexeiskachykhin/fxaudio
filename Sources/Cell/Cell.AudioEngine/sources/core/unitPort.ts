/// <reference path="../_references.ts" />


module FxAudioEngine {
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
            this._audioNode = audioNode;
            this._direction = direction;
            this._channel = channel;
        }


        public connect(port: UnitPort): void {
            if (port._direction !== UnitPortDirection.INPUT) {
                throw new Error('Can`t connect to output node.');
            }

            var sourceAudioNode: AudioNode = this._audioNode;
            var destinationAudioNode: AudioNode = port._audioNode;

            sourceAudioNode.connect(destinationAudioNode, this._channel, port._channel);
        }

        public disconnect(): void {
            this._audioNode.disconnect(this._channel);
        }
    }
}
