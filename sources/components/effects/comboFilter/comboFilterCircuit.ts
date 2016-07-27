/// <reference path="../../../_references.ts" />


module FXAudio {
    'use strict';


    var MAX_DELAY_TIME = 0.05;


    export class ComboFilterCircuit extends Circuit {

        private _inputNode: GainNode;

        private _outputNode: GainNode;

        private _delayNode: DelayNode;

        private _feedbackNode: GainNode;


        public get inputNode(): GainNode {
            return this._inputNode;
        }

        public get outputNode(): GainNode {
            return this._outputNode;
        }

        public get delayNode(): DelayNode {
            return this._delayNode;
        }

        public get feedbackNode(): GainNode {
            return this._feedbackNode;
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context);

            this._createComboFilterComponents();
            this._connectComboFilterComponents();
            this._publishComboFilterComponents();
        }


        private _createComboFilterComponents(): void {
            Contract.isNotNullOrUndefined(this.context, 'context');

            var audioContext: AudioContext = this.context.audioContext;

            this._inputNode = audioContext.createGain();
            this._outputNode = audioContext.createGain();
            this._delayNode = audioContext.createDelay(MAX_DELAY_TIME);
            this._feedbackNode = audioContext.createGain();
        }

        private _connectComboFilterComponents(): void {
            Contract.isNotNullOrUndefined(this._inputNode, '_inputNode');
            Contract.isNotNullOrUndefined(this._outputNode, '_outputNode');
            Contract.isNotNullOrUndefined(this._delayNode, '_delayNode');
            Contract.isNotNullOrUndefined(this._feedbackNode, '_feedbackNode');

            this._inputNode.connect(this._outputNode);
            this._inputNode.connect(this._delayNode);
            this._delayNode.connect(this._outputNode);
            this._delayNode.connect(this._feedbackNode);
            this._feedbackNode.connect(this._inputNode);
        }

        private _publishComboFilterComponents(): void {
            Contract.isNotNullOrUndefined(this._inputNode, '_inputNode');
            Contract.isNotNullOrUndefined(this._outputNode, '_outputNode');

            this._publishInputComponent(this._inputNode);
            this._publishOutputComponent(this._outputNode);
        }
    }
}
