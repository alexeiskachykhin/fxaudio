/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class SignalMergerCircuit extends SignalHubCircuit {

        constructor(context: Context, numberOfInputs: number) {
            Contract.isNotNullOrUndefined(context, 'context');
            Contract.isPositiveOrZero(numberOfInputs, 'numberOfInputs');

            super(context, numberOfInputs, 1);
        }
    }
}
