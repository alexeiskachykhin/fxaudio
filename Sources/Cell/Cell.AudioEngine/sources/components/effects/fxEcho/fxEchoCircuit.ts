/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxEchoCircuit extends FxCircuit {

        private _delayNode: DelayNode;

        private _feedbackGainNode: GainNode;

        private _echoGainNode: GainNode;

        private _outputGainNode: GainNode;


        public get delayNode(): DelayNode {
            return this._delayNode;
        }

        public get feedbackGainNode(): GainNode {
            return this._feedbackGainNode;
        }

        public get echoGainNode(): GainNode {
            return this._echoGainNode;
        }

        public get outputGainNode(): GainNode {
            return this._outputGainNode;
        }


        constructor(context: FxContext, maxDelayTime) {
            super(context);

            this._buildAudioCircuit(maxDelayTime);
        }


        private _buildAudioCircuit(maxDelayTime): void {
            var audioContext: AudioContext = this.context.audioContext;

            this._delayNode = audioContext.createDelay(maxDelayTime);
            this._feedbackGainNode = audioContext.createGain();
            this._echoGainNode = audioContext.createGain();
            this._outputGainNode = audioContext.createGain();

            var linearRoute: AudioNode[] = [
                this._delayNode,
                this._echoGainNode,
                this._outputGainNode
            ];

            FxAudioUtilities.WebAudioAPI.routeLinear(linearRoute);
            FxAudioUtilities.WebAudioAPI.routeWithFeedback(this._delayNode, this._feedbackGainNode);

            this._publishInputComponent(this._delayNode);
            this._publishOutputComponent(this._outputGainNode);
        }
    }
}
