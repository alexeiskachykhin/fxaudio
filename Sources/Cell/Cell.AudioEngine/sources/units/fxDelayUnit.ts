/// <reference path="../../libraries/waa.d.ts" />

/// <reference path="../fxUnitContext.ts" />
/// <reference path="../fxUnit.ts" />
/// <reference path="../fxUnitPort.ts" />
/// <reference path="../fxAudioUtilities.ts" />


module FxAudioEngine.Units {
    'use strict';


    var DEFAULT_MAX_DELAY_TIME = 3.0;


    export class FxDelayUnit extends FxUnit {

        private _delayNode: DelayNode;

        private _maxDelayTime: number;


        public get time(): number {
            return this._delayNode.delayTime.value;
        }

        public set time(value: number) {
            this._delayNode.delayTime.value = value;
        }


        constructor(unitContext: FxUnitContext, maxDelayTime?: number) {
            this._maxDelayTime = maxDelayTime || DEFAULT_MAX_DELAY_TIME;

            var audioGraph = this._buildAudioGraph(unitContext);

            super(unitContext, audioGraph);
        }


        private _buildAudioGraph(unitContext: FxUnitContext): AudioNode[] {
            var audioNode: DelayNode = unitContext.audioContext.createDelay(this._maxDelayTime);
            var audioGraph: AudioNode[] = [audioNode];

            this._delayNode = audioNode;

            return audioGraph;
        }
    }
}