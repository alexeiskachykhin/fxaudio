/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';

   
    export enum FxUnitPortDirection {
        INPUT,
        OUTPUT,
        BYPASS
    }
    

    export class FxUnitPort {

        private _audioNode: AudioNode;

        private _direction: FxUnitPortDirection;


        constructor(audioNode: AudioNode, direction: FxUnitPortDirection) {
            this._audioNode = audioNode;
            this._direction = direction;
        }


        public connect(port: FxUnitPort): void {
            if (port._direction !== FxUnitPortDirection.INPUT) {
                throw new Error('Can`t connect to output node.');
            }

            var sourceAudioNode = this._audioNode;
            var destionationAudioNode = port._audioNode;

            sourceAudioNode.connect(destionationAudioNode);
        }

        public disconnect(): void {
            this._audioNode.disconnect();
        }
    }
}
