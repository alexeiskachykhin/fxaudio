/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    export class EchoCircuit extends Circuit {

        private _inputNode: GainNode;

        private _delayNode: DelayNode;

        private _feedbackNode: GainNode;

        private _balanceNode: GainNode;

        private _outputNode: GainNode;


        public get inputNode(): GainNode {
            return this._inputNode;
        }

        public get delayNode(): DelayNode {
            return this._delayNode;
        }

        public get feedbackNode(): GainNode {
            return this._feedbackNode;
        }

        public get balanceNode(): GainNode {
            return this._balanceNode;
        }

        public get outputNode(): GainNode {
            return this._outputNode;
        }


        constructor(context: Context, maxDelayTime: number) {
            Contract.isNotNullOrUndefined(context, 'context');
            Contract.isPositiveOrZero(maxDelayTime, 'maxDelayTime');

            super(context);

            this._createEchoComponents(maxDelayTime);
            this._connectEchoComponents();
            this._publishEchoComponents();
        }

        private _createEchoComponents(maxDelayTime: number): void {
            Contract.isPositiveOrZero(maxDelayTime, 'maxDelayTime');

            var audioContext: AudioContext = this.context.audioContext;

            this._inputNode = audioContext.createGain();
            this._delayNode = audioContext.createDelay(maxDelayTime);
            this._feedbackNode = audioContext.createGain();
            this._balanceNode = audioContext.createGain();
            this._outputNode = audioContext.createGain();
        }

        private _connectEchoComponents(): void {
            Contract.isNotNullOrUndefined(this._inputNode, '_inputNode');
            Contract.isNotNullOrUndefined(this._delayNode, '_delayNode');
            Contract.isNotNullOrUndefined(this._feedbackNode, '_feedbackNode');
            Contract.isNotNullOrUndefined(this._balanceNode, '_balanceNode');
            Contract.isNotNullOrUndefined(this._outputNode, '_outputNode');

            AudioUtilities.WebAudioAPI.routeLinear(this._inputNode, this._outputNode);
            AudioUtilities.WebAudioAPI.routeLinear(this._inputNode, this._delayNode, this._balanceNode, this._outputNode);
            AudioUtilities.WebAudioAPI.routeWithFeedback(this._delayNode, this._feedbackNode);
        }

        private _publishEchoComponents(): void {
            Contract.isNotNullOrUndefined(this._inputNode, '_inputNode');
            Contract.isNotNullOrUndefined(this._outputNode, '_outputNode');

            this._publishInputComponent(this._inputNode);
            this._publishOutputComponent(this._outputNode);
        }
    }
}
