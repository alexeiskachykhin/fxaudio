/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxUnit {

        private _context: FxUnitContext;


        public get context(): FxUnitContext {
            return this._context;
        }

        public get ports(): FxUnitInterface {
            throw new Error('Not Implemented.');
        }


        constructor(unitContext: FxUnitContext) {
            this._context = unitContext;
        }
    }
}
