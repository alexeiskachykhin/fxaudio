/// <reference path="../../../_references.ts" />


module FXAudio {
    'use strict';


    export class LiveInputSourceCircuit extends Circuit {

        private _outputGainNode: GainNode;

        private _mediStreamSourceNode: MediaStreamAudioSourceNode;


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context);

            this._createLiveInputSourceCircuit();
        }


        public mountStream(stream: MediaStream): void {
            Contract.isNotNullOrUndefined(stream, 'stream');
            Contract.isNotNullOrUndefined(this._outputGainNode, '_outputGainNode');

            this._mediStreamSourceNode = this.context.audioContext.createMediaStreamSource(<any>stream);
            this._mediStreamSourceNode.connect(this._outputGainNode);
        }


        private _createLiveInputSourceCircuit(): void {
            Contract.isNotNullOrUndefined(this.context, 'context');

            this._outputGainNode = this.context.audioContext.createGain();
            this._publishOutputComponent(this._outputGainNode);
        }
    }
}
