/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    var DEFAULT_MAX_DELAY_TIME = 3.0;


    export class FxDelayUnit extends FxUnit {

        private _delayNode: DelayNode;

        private _ports: FxUnitInterface;


        public get time(): number {
            return this._delayNode.delayTime.value;
        }

        public set time(value: number) {
            this._delayNode.delayTime.value = value;
        }

        public get ports(): FxUnitInterface {
            return this._ports;
        }


        constructor(context: FxUnitContext, maxDelayTime?: number) {
            super(context);
 
            maxDelayTime = maxDelayTime || DEFAULT_MAX_DELAY_TIME;

            var audioGraph: DelayNode = this._buildAudioGraph(maxDelayTime);
            var audioInterface: FxUnitInterface = this._buildInterface(audioGraph);

            this._delayNode = audioGraph;
            this._ports = audioInterface;
        }


        private _buildAudioGraph(maxDelayTime: number): DelayNode {
            var audioNode: DelayNode = this.context.audioContext.createDelay(maxDelayTime);

            return audioNode;
        }

        private _buildInterface(audioGraph: AudioNode): FxUnitInterface {
            var ports: FxUnitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph([audioGraph]);

            return ports;
        }
    }
}
