/// <reference path="../../../_references.ts" />


module FXAudio {
    'use strict';


    var NUMBER_OF_CHANNELS = 2;
    var DEFAULT_DECAY = 2.0;
    var DEFAULT_TIME = 3;


    export class ReverbCircuit extends Circuit {

        private _convolverNode: ConvolverNode;

        private _gainNode: GainNode;

        private _time: number;

        private _decay: number;


        public get gainNode(): GainNode {
            return this._gainNode;
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context);

            this._createReverbComponents();
            this._connectReverbComponents();
            this._publishReverbComponents();
        }


        public getTime(): number {
            return this._time;
        }

        public setTime(value: number): void {
            this._time = value;
            this._buildImpulseResponse();
        }

        public getDecay(): number {
            return this._decay;
        }

        public setDecay(value: number): void {
            this._decay = value;
            this._buildImpulseResponse();
        }


        private _createReverbComponents(): void {
            Contract.isNotNullOrUndefined(this.context, 'context');

            var audioContext = this.context.audioContext;

            this._convolverNode = audioContext.createConvolver();
            this._gainNode = audioContext.createGain();


            this._time = DEFAULT_TIME;
            this._decay = DEFAULT_DECAY;

            this._buildImpulseResponse();
        }

        private _connectReverbComponents(): void {
            Contract.isNotNullOrUndefined(this._convolverNode, '_convolverNode');
            Contract.isNotNullOrUndefined(this._gainNode, '_gainNode');

            this._convolverNode.connect(this._gainNode);
        }

        private _publishReverbComponents(): void {
            Contract.isNotNullOrUndefined(this._convolverNode, '_convolverNode');
            Contract.isNotNullOrUndefined(this._gainNode, '_gainNode');

            this._publishInputComponent(this._convolverNode);
            this._publishOutputComponent(this._gainNode);
        }

        private _buildImpulseResponse(): void {
            Contract.isNotNullOrUndefined(this.context, 'context');
            Contract.isNotNullOrUndefined(this._convolverNode, '_convolverNode');

            var audioContext = this.context.audioContext;

            var rate = audioContext.sampleRate;
            var decay = this._decay;
            var numberOfSamples = rate * this._time;

            var impulseResponse: AudioBuffer = audioContext.createBuffer(NUMBER_OF_CHANNELS, numberOfSamples, rate);
            var impulseResponseLeft: Float32Array = impulseResponse.getChannelData(0);
            var impulseResponseRight: Float32Array = impulseResponse.getChannelData(1);

            for (var i = 0; i < numberOfSamples; i++) {
                var factor = Math.pow(1 - i / numberOfSamples, decay);

                impulseResponseLeft[i] = (Math.random() * 2 - 1) * factor;
                impulseResponseRight[i] = (Math.random() * 2 - 1) * factor;
            }

            this._convolverNode.buffer = impulseResponse;
        }
    }
}
