/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class LiveInputSourceCircuit extends Circuit {

        private _outputGainNode: GainNode;

        private _mediStreamSourceNode: MediaStreamAudioSourceNode;


        constructor(context: Context) {
            super(context);

            this._buildAudioCircuit();
        }


        public mountStream(stream: MediaStream): void {
            this._mediStreamSourceNode = this.context.audioContext.createMediaStreamSource(<any>stream);
            this._mediStreamSourceNode.connect(this._outputGainNode);
        }


        private _buildAudioCircuit(): void {
            this._outputGainNode = this.context.audioContext.createGain();
            this._publishOutputComponent(this._outputGainNode);
        }
    }
}
