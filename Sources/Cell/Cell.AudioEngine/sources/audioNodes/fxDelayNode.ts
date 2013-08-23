/// <reference path="../../libraries/waa.d.ts" />

/// <reference path="../fxAudioNode.ts" />
/// <reference path="../fxAudioPort.ts" />
/// <reference path="../fxAudioEngine.ts" />
/// <reference path="../fxAudioUtilities.ts" />


module FxAudioEngine {
    'use strict';


    var DEFAULT_MAX_DELAY_TIME = 3.0;


    export class FxDelayNode extends FxAudioNode {

        private _delayNode: DelayNode;

        private _maxDelayTime: number;


        public get time(): number {
            return this._delayNode.delayTime.value;
        }

        public set time(value: number) {
            this._delayNode.delayTime.value = value;
        }


        constructor(maxDelayTime?: number) {
            super();

            this._maxDelayTime = maxDelayTime || DEFAULT_MAX_DELAY_TIME;


            var audioGraph: AudioNode[] = this._buildAudioGraph();
            var audioInterface: FxAudioNodeInterface = this._buildAudioInterface();

            this._setAudioNodeInternals(audioGraph, audioInterface);
        }


        private _buildAudioGraph(): AudioNode[] {
            var audioNode: DelayNode = FxAudioEngine.context.createDelay(DEFAULT_MAX_DELAY_TIME);
            var audioGraph: AudioNode[] = [audioNode];

            this._delayNode = audioNode;

            return audioGraph;
        }

        private _buildAudioInterface(): FxAudioNodeInterface {
            var input = new FxAudioPort(this._delayNode, FxAudioPortDirection.INPUT);
            var output = new FxAudioPort(this._delayNode, FxAudioPortDirection.OUTPUT);

            var audioInterface = new FxAudioNodeInterface(
                [input],
                [output]); 

            return audioInterface;
        }
    }
}