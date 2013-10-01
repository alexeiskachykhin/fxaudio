/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';

   
    export enum FxUnitPortDirection {
        INPUT,
        OUTPUT
    }
    

    export class FxUnitPort {

        private _audioNode: AudioNode;

        private _channel: number;

        private _direction: FxUnitPortDirection;


        constructor(audioNode: AudioNode, channel: number, direction: FxUnitPortDirection) {
            this._audioNode = audioNode;
            this._direction = direction;
            this._channel = channel;
        }


        public connect(port: FxUnitPort): void {
            if (port._direction !== FxUnitPortDirection.INPUT) {
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
