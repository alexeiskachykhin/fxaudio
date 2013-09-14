/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxUnit {

        private _unitContext: FxUnitContext;

        public _unitInterface: FxUnitInterface;


        public get unitContext(): FxUnitContext {
            return this._unitContext;
        }

        public get ports(): FxUnitInterface {
            return this._unitInterface;
        }


        constructor(
            unitContext: FxUnitContext) {
                this._unitContext = unitContext;
        }
    }
}
