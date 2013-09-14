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


        constructor(unitContext: FxUnitContext, maxDelayTime?: number) {
            this._maxDelayTime = maxDelayTime || DEFAULT_MAX_DELAY_TIME;

            var unitInterface: FxUnitInterface = this._buildUnitInterface(unitContext);

            super(unitContext, unitInterface);
        }


        private _buildUnitInterface(unitContext: FxUnitContext): FxUnitInterface {
            this._delayNode = unitContext.audioContext.createDelay(this._maxDelayTime);

            return FxAudioUtilities.AudioInterface.fromAudioGraph([this._delayNode]);
        }
    }
}
