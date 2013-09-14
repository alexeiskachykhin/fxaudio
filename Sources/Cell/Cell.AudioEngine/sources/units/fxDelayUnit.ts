/// <reference path="../_references.ts" />


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


        constructor(context: FxUnitContext, maxDelayTime?: number) {
            super(context);

            this._delayNode = context.audioContext.createDelay(this._maxDelayTime);
            this._maxDelayTime = maxDelayTime || DEFAULT_MAX_DELAY_TIME;

            this._ports = this._buildInterface();
        }


        private _buildInterface(): FxUnitInterface {
            var ports: FxUnitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph([this._delayNode]);

            return ports;
        }
    }
}
