/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAudioSourceUnit<TCircuit extends FxCircuit, TSource> extends FxUnit<TCircuit> {

        public stream: IFxAudioSourceController;


        constructor(circuit: TCircuit) {
            super(circuit);
        }


        public init(source: TSource): IFxEventSource {
            throw new Error('This method is abstract.');
        }
    }
}
