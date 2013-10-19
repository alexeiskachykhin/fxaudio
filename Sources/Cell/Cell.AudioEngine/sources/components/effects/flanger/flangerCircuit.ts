/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    var DEFAULT_DELAY_TIME = 0.005;
    var DEFAULT_FEEDBACK = 0.5;
    var DEFAULT_DEPTH = 0.002;
    var DEFAULT_SPEED = 0.25;
    var MAX_DEPTH = 0.05;


    export class FlangerCircuit extends Circuit {

        private _inputNode: GainNode;

        private _outputNode: GainNode;

        private _delayNode: DelayNode;

        private _feedbackNode: GainNode;

        private _depthNode: GainNode;

        private _lfoNode: OscillatorNode;


        public get lfoNode(): OscillatorNode {
            return this._lfoNode;
        }

        public get delayNode(): DelayNode {
            return this._delayNode;
        }

        public get depthNode(): GainNode {
            return this._depthNode;
        }

        public get feedbackNode(): GainNode {
            return this._feedbackNode;
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context);

            this._buildAudioCircuit();
        }


        private _buildAudioCircuit(): void {
            Contract.isNotNullOrUndefined(this.context, 'context');

            var audioContext: AudioContext = this.context.audioContext;

            // Combo Filter

            this._inputNode = audioContext.createGain();
            this._outputNode = audioContext.createGain();
            this._delayNode = audioContext.createDelay(MAX_DEPTH);
            this._delayNode.delayTime.value = DEFAULT_DELAY_TIME;
            this._feedbackNode = audioContext.createGain();
            this._feedbackNode.gain.value = DEFAULT_FEEDBACK;


            this._inputNode.connect(this._outputNode);
            this._inputNode.connect(this._delayNode);
            this._delayNode.connect(this._outputNode);
            this._delayNode.connect(this._feedbackNode);
            this._feedbackNode.connect(this._inputNode);


            // Programmable Delay Extension

            this._depthNode = audioContext.createGain();
            this._depthNode.gain.value = DEFAULT_DEPTH;
            

            this._lfoNode = audioContext.createOscillator();
            this._lfoNode.frequency.value = DEFAULT_SPEED;
            this._lfoNode.start(0);


            this._lfoNode.connect(this._depthNode);
            this._depthNode.connect(this._delayNode.delayTime);


            // Publishing

            this._publishInputComponent(this._inputNode);
            this._publishOutputComponent(this._outputNode);
        }
    }
}
