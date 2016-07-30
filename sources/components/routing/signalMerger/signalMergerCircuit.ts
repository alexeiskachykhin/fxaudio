/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    export class SignalMergerCircuit extends SignalHubCircuit {

        constructor(context: Context, numberOfInputs: number) {
            Contract.isNotNullOrUndefined(context, 'context');
            Contract.isPositiveOrZero(numberOfInputs, 'numberOfInputs');

            super(context, numberOfInputs, 1);
        }
    }
}
