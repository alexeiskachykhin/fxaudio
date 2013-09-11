/// <reference path="../../libraries/waa.d.ts" />

/// <reference path="../fxAudioContext.ts" />
/// <reference path="../fxAudioPort.ts" />
/// <reference path="../fxAudioNode.ts" />
/// <reference path="../fxAudioUtilities.ts" />


module FxAudioEngine.Nodes {
    'use strict';


    export class FxOverdriveNode extends FxAudioNode {

        private _waveShaperNode: WaveShaperNode;

        private _lowPassFilterNode: BiquadFilterNode;

        private _gainNode: GainNode;


        constructor(audioContext: FxAudioContext) {
            var audioGraph = this._buildAudioGraph(audioContext);

            super(audioContext, audioGraph);
        }


        private _buildAudioGraph(audioContext: FxAudioContext): AudioNode[] {
            this._lowPassFilterNode = audioContext.audioContext.createBiquadFilter();
            this._lowPassFilterNode.type = 0;
            this._lowPassFilterNode.frequency.value = 3000;

            this._waveShaperNode = audioContext.audioContext.createWaveShaper();
            this._setDrive(audioContext.sampleRate, 120);

            this._gainNode = audioContext.audioContext.createGain();


            var audioGraph: AudioNode[] = [
                this._lowPassFilterNode,
                this._waveShaperNode,
                this._gainNode
            ];

            return audioGraph;
        }

        private _setDrive(sampleRate:number, value: number): void {
            var k = value;
            var deg = Math.PI / 180;

            var wsCurve = new Float32Array(sampleRate);

            for (var i = 0; i < sampleRate; i += 1) {
                var x = i * 2 / sampleRate - 1;
                wsCurve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
            }

            this._waveShaperNode.curve = wsCurve;
        }
    }
}