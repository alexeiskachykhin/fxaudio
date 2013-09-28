/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxOverdriveUnit extends FxUnit<FxOverdriveUnitCircuit> {

        constructor(context: FxUnitContext) {
            super(new FxOverdriveUnitCircuit(context));
        }
    }


    export class FxOverdriveUnitCircuit extends FxUnitCircuit {

        private _waveShaperNode: WaveShaperNode;

        private _lowPassFilterNode: BiquadFilterNode;

        private _gainNode: GainNode;


        constructor(context: FxUnitContext) {
            super(context);

            this._buildAudioCircuit();
        }


        private _buildAudioCircuit(): void {
            var audioContext: AudioContext = this.context.audioContext;

            this._lowPassFilterNode = audioContext.createBiquadFilter();
            this._lowPassFilterNode.type = 0;
            this._lowPassFilterNode.frequency.value = 3000;

            this._waveShaperNode = audioContext.createWaveShaper();
            this._setDrive(audioContext.sampleRate, 120);

            this._gainNode = audioContext.createGain();


            var audioGraph: AudioNode[] = [
                this._lowPassFilterNode,
                this._waveShaperNode,
                this._gainNode
            ];

            FxAudioUtilities.WebAudioAPI.routeAudioGraph(audioGraph);

            this._addInputNode(this._lowPassFilterNode);
            this._addOutputNode(this._gainNode);
        }

        private _setDrive(sampleRate: number, value: number): void {
            var k: number = value;
            var deg: number = Math.PI / 180;

            var wsCurve = new Float32Array(sampleRate);

            for (var i: number = 0; i < sampleRate; i += 1) {
                var x: number = i * 2 / sampleRate - 1;
                wsCurve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
            }

            this._waveShaperNode.curve = wsCurve;
        }
    }
}
