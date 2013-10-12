/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class AudioSourceUnit<TCircuit extends Circuit, TSource> extends Unit<TCircuit> {

        public stream: IAudioSourceController;


        constructor(circuit: TCircuit) {
            super(circuit);
        }


        public init(source: TSource): IEventSource {
            throw new Error('This method is abstract.');
        }
    }
}
