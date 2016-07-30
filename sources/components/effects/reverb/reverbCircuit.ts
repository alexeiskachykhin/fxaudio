/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    const NUMBER_OF_CHANNELS = 2;
    const DEFAULT_DECAY = 2.0;
    const DEFAULT_TIME = 3;


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

            var audioContext: AudioContext = this.context.audioContext;

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

            const audioContext = this.context.audioContext;

            const rate = audioContext.sampleRate;
            const decay = this._decay;
            const numberOfSamples = rate * this._time;

            const impulseResponse: AudioBuffer = audioContext.createBuffer(NUMBER_OF_CHANNELS, numberOfSamples, rate);
            const impulseResponseLeft: Float32Array = impulseResponse.getChannelData(0);
            const impulseResponseRight: Float32Array = impulseResponse.getChannelData(1);

            for (let i = 0; i < numberOfSamples; i++) {
                const factor = Math.pow(1 - i / numberOfSamples, decay);

                impulseResponseLeft[i] = (Math.random() * 2 - 1) * factor;
                impulseResponseRight[i] = (Math.random() * 2 - 1) * factor;
            }

            this._convolverNode.buffer = impulseResponse;
        }
    }
}
