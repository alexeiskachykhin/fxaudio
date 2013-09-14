/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxUnit {

        private _context: FxUnitContext;


        public _ports: FxUnitInterface;


        public get context(): FxUnitContext {
            return this._context;
        }

        public get ports(): FxUnitInterface {
            return this._ports;
        }


        constructor(
            unitContext: FxUnitContext) {
                this._context = unitContext;
        }
    }
}
