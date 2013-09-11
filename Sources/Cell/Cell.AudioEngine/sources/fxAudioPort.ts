/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';

   
    export enum FxAudioPortDirection {
        INPUT,
        OUTPUT,
        BYPASS
    }
    

    export class FxAudioPort {

        private _audioNode: AudioNode;

        private _direction: FxAudioPortDirection;


        constructor(audioNode: AudioNode, direction: FxAudioPortDirection) {
            this._audioNode = audioNode;
            this._direction = direction;
        }


        public connect(port: FxAudioPort): void {
            if (port._direction != FxAudioPortDirection.INPUT) {
                throw new Error("Can`t connect to output node.");
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