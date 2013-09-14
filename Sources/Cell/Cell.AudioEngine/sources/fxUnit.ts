/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxUnit {

        private _unitContext: FxUnitContext;

        private _unitInterface: FxUnitInterface;


        public get unitContext(): FxUnitContext {
            return this._unitContext;
        }

        public get ports(): FxUnitInterface {
            return this._unitInterface;
        }


        constructor(
            unitContext: FxUnitContext,
            unitInterface: FxUnitInterface) {
                this._unitContext = unitContext;
                this._unitInterface = unitInterface;
        }
    }
}
