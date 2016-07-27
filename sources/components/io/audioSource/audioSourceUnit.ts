/// <reference path="../../../_references.ts" />


module FXAudio {
    'use strict';


    export class AudioSourceUnit<TCircuit extends Circuit, TSource> extends Unit<TCircuit> {

        public stream: IAudioSourceController;


        constructor(circuit: TCircuit) {
            Contract.isNotNullOrUndefined(circuit, 'circuit');

            super(circuit);
        }


        public init(source: TSource): IEventSource {
            throw Errors.abstract();
        }
    }
}
