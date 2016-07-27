/// <reference path="../../../_references.ts" />


module FXAudio {
    'use strict';


    export class NetworkSourceCircuit extends Circuit {

        private _outputGainNode: GainNode;

        private _mediElementSourceNode: MediaStreamAudioSourceNode;


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context);

            this._createNetworkSourceCircuit();
        }


        public mountMediaElement(mediaElement: HTMLMediaElement): void {
            Contract.isNotNullOrUndefined(mediaElement, 'mediaElement');
            Contract.isNotNullOrUndefined(this._outputGainNode, '_outputGainNode');

            this._mediElementSourceNode = this.context.audioContext.createMediaElementSource(mediaElement);
            this._mediElementSourceNode.connect(this._outputGainNode);
        }

        private _createNetworkSourceCircuit(): void {
            Contract.isNotNullOrUndefined(this.context, 'context');

            this._outputGainNode = this.context.audioContext.createGain();
            this._publishOutputComponent(this._outputGainNode);
        }
    }
}
