/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class SignalSplitterCircuit extends SignalHubCircuit {

        constructor(context: Context, numberOfOutputs: number) {
            Contract.isNotNullOrUndefined(context, 'context');
            Contract.isPositiveOrZero(numberOfOutputs, 'numberOfOutputs');

            super(context, 1, numberOfOutputs);
        }
    }
}
