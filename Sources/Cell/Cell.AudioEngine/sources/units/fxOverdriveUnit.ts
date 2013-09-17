/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxOverdriveUnit extends FxUnit<FxOverdriveUnitBuilder> {

        constructor(context: FxUnitContext) {
            super(context, new FxOverdriveUnitBuilder());
        }
    }


    export class FxOverdriveUnitBuilder implements IFxUnitBuilder {

        private _waveShaperNode: WaveShaperNode;

        private _lowPassFilterNode: BiquadFilterNode;

        private _gainNode: GainNode;


        public buildAudioGraph(unitContext: FxUnitContext): AudioNode[] {
            this._lowPassFilterNode = unitContext.audioContext.createBiquadFilter();
            this._lowPassFilterNode.type = 0;
            this._lowPassFilterNode.frequency.value = 3000;

            this._waveShaperNode = unitContext.audioContext.createWaveShaper();
            this._setDrive(unitContext.sampleRate, 120);

            this._gainNode = unitContext.audioContext.createGain();


            var audioGraph: AudioNode[] = [
                this._lowPassFilterNode,
                this._waveShaperNode,
                this._gainNode
            ];

            FxAudioUtilities.WebAudioAPI.routeAudioGraph(audioGraph);

            return audioGraph;
        }

        public buildAudioInterface(audioGraph: AudioNode[]): FxUnitInterface {
            var audioInterface: FxUnitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph(audioGraph);

            return audioInterface;
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
