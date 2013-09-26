/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxUnit<TBuilder extends IFxUnitBuilder> {

        private _context: FxUnitContext;

        private _ports: FxUnitInterface;

        private _builder: TBuilder;


        public get context(): FxUnitContext {
            return this._context;
        }

        public get ports(): FxUnitInterface {
            return this._ports;
        }

        public get builder(): TBuilder {
            return this._builder;
        }


        constructor(unitContext: FxUnitContext, builder: TBuilder) {
            var audioCircuit: FxAudioCircuit = builder.buildAudioCircuit(unitContext);
            var audioInterface: FxUnitInterface = new FxUnitInterface(audioCircuit);

            this._context = unitContext;
            this._ports = audioInterface;
            this._builder = builder;
        }
    }
}
