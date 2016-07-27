/// <reference path="../../../_references.ts" />


module FXAudio {
    'use strict';


    export class SignalMergerUnit extends Unit<SignalMergerCircuit> {

        constructor(context: Context, numberOfInputs: number = 6) {
            Contract.isNotNullOrUndefined(context, 'context');
            Contract.isPositiveOrZero(numberOfInputs, 'numberOfInputs');

            super(new SignalMergerCircuit(context, numberOfInputs));
        }
    }
}
