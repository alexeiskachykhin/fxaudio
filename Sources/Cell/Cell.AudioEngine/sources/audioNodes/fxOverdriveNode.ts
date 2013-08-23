/// <reference path="../../libraries/waa.d.ts" />

/// <reference path="../fxAudioPort.ts" />
/// <reference path="../fxAudioNode.ts" />
/// <reference path="../fxAudioEngine.ts" />
/// <reference path="../fxAudioUtilities.ts" />


module FxAudioEngine {
    'use strict';


    export class FxOverdriveNode extends FxAudioNode {

        private _waveShaper: WaveShaperNode;

        private _lowPassFilter: BiquadFilterNode;

        private _gain: GainNode;


        constructor() {
            super();

            var audioGraph: AudioNode[] = this._buildAudioGraph();
            var audioInterface: FxAudioNodeInterface = this._buildAudioInterface();

            this._setAudioNodeInternals(audioGraph, audioInterface);
        }


        private _buildAudioGraph(): AudioNode[] {
            this._lowPassFilter = FxAudioEngine.context.createBiquadFilter();
            this._lowPassFilter.type = 0;
            this._lowPassFilter.frequency.value = 3000;

            this._waveShaper = FxAudioEngine.context.createWaveShaper();
            this._setDrive(120);

            this._gain = FxAudioEngine.context.createGain();


            var audioGraph: AudioNode[] = [
                this._lowPassFilter,
                this._waveShaper,
                this._gain
            ];

            return audioGraph;
        }

        private _buildAudioInterface(): FxAudioNodeInterface {
            var inputPort = new FxAudioPort(this._lowPassFilter, FxAudioPortDirection.INPUT);
            var outputPort = new FxAudioPort(this._gain, FxAudioPortDirection.OUTPUT);

            var audioInterface = new FxAudioNodeInterface(
                [inputPort],
                [outputPort]);

            return audioInterface;
        }

        private _setDrive(value: number): void {
            var k = value;
            var n_samples = 22050;
            var deg = Math.PI / 180;

            var wsCurve = new Float32Array(n_samples);

            for (var i = 0; i < n_samples; i += 1) {
                var x = i * 2 / n_samples - 1;
                wsCurve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
            }

            this._waveShaper.curve = wsCurve;
        }
    }
}