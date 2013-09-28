/// <reference path="../../_references.ts" />


module FxAudioEngine.Units.Source {
    'use strict';


    export class FxAudioSourceUnit<TCircuit extends FxUnitCircuit, TSource> extends FxUnit<TCircuit> {

        public stream: IFxAudioSourceController;


        constructor(circuit: TCircuit) {
            super(circuit);
        }


        public init(source: TSource): IFxEventSource {
            throw new Error('This method is abstract.');
        }
    }
}
