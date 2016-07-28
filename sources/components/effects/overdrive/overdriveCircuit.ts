/// <reference path="../../../_references.ts" />


module FXAudio {
    'use strict';


    export class OverdriveCircuit extends Circuit {

        private _waveShaperNode: WaveShaperNode;

        private _lowPassFilterNode: BiquadFilterNode;

        private _gainNode: GainNode;

        private _drive: number;


        public get gainNode(): GainNode {
            return this._gainNode;
        }

        public get lowPassFilterNode(): BiquadFilterNode {
            return this._lowPassFilterNode;
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context);

            this._createOverdriveComponents();
            this._connectOverdriveComponents();
            this._publishOverdriveComponents();
        }


        public getDrive(): number {
            return this._drive;
        }

        public setDrive(value: number): void {
            Contract.isPositiveOrZero(value, 'value');

            var k: number = value;
            var deg: number = Math.PI / 180;

            var sampleRate: number = this.context.sampleRate;
            var shapingCurve = new Float32Array(sampleRate);

            for (var i: number = 0; i < sampleRate; i += 1) {
                var x: number = i * 2 / sampleRate - 1;
                shapingCurve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
            }

            this._waveShaperNode.curve = shapingCurve;
            this._drive = value;
        }


        private _createOverdriveComponents(): void {
            Contract.isNotNullOrUndefined(this.context, 'context');

            var audioContext: AudioContext = this.context.audioContext;

            this._lowPassFilterNode = audioContext.createBiquadFilter();
            this._lowPassFilterNode.type = 'lowpass';
            this._lowPassFilterNode.frequency.value = 3000;

            this._waveShaperNode = audioContext.createWaveShaper();
            this.setDrive(120);

            this._gainNode = audioContext.createGain();
        }

        private _connectOverdriveComponents(): void {
            Contract.isNotNullOrUndefined(this._lowPassFilterNode, '_lowPassFilterNode');
            Contract.isNotNullOrUndefined(this._waveShaperNode, '_waveShaperNode');
            Contract.isNotNullOrUndefined(this._gainNode, '_gainNode');

            AudioUtilities.WebAudioAPI.routeLinear(this._lowPassFilterNode, this._waveShaperNode, this._gainNode);
        }

        private _publishOverdriveComponents(): void {
            Contract.isNotNullOrUndefined(this._lowPassFilterNode, '_lowPassFilterNode');
            Contract.isNotNullOrUndefined(this._gainNode, '_gainNode');

            this._publishInputComponent(this._lowPassFilterNode);
            this._publishOutputComponent(this._gainNode);
        }
    }
}
