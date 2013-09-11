/// <reference path="../../libraries/waa.d.ts" />

/// <reference path="../fxAudioContext.ts" />
/// <reference path="../fxAudioNode.ts" />
/// <reference path="../fxAudioPort.ts" />
/// <reference path="../fxAudioUtilities.ts" />


module FxAudioEngine.Nodes {
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


        constructor(audioContext: FxAudioContext, maxDelayTime?: number) {
            this._maxDelayTime = maxDelayTime || DEFAULT_MAX_DELAY_TIME;

            var audioGraph = this._buildAudioGraph(audioContext);

            super(audioContext, audioGraph);
        }


        private _buildAudioGraph(audioContext: FxAudioContext): AudioNode[] {
            var audioNode: DelayNode = audioContext.audioContext.createDelay(this._maxDelayTime);
            var audioGraph: AudioNode[] = [audioNode];

            this._delayNode = audioNode;

            return audioGraph;
        }
    }
}