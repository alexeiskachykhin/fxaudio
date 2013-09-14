/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxOverdriveUnit extends FxUnit {

        private _waveShaperNode: WaveShaperNode;

        private _lowPassFilterNode: BiquadFilterNode;

        private _gainNode: GainNode;


        constructor(unitContext: FxUnitContext) {
            super(unitContext);

            this._lowPassFilterNode = unitContext.audioContext.createBiquadFilter();
            this._lowPassFilterNode.type = 0;
            this._lowPassFilterNode.frequency.value = 3000;

            this._waveShaperNode = unitContext.audioContext.createWaveShaper();
            this._setDrive(unitContext.sampleRate, 120);

            this._gainNode = unitContext.audioContext.createGain();

            this._unitInterface = this._buildUnitInterface();
        }


        private _buildUnitInterface(): FxUnitInterface {
            var audioGraph: AudioNode[] = [
                this._lowPassFilterNode,
                this._waveShaperNode,
                this._gainNode
            ];

            FxAudioUtilities.WebAudioAPI.routeAudioGraph(audioGraph);
            var unitInterface: FxUnitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph(audioGraph);

            return unitInterface;
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
