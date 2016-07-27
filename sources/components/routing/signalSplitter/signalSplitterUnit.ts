/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class SignalSplitterUnit extends Unit<SignalSplitterCircuit> {

        constructor(context: Context, numberOfOutputs: number = 6) {
            Contract.isNotNullOrUndefined(context, 'context');
            Contract.isPositiveOrZero(numberOfOutputs, 'numberOfOutputs');

            super(new SignalSplitterCircuit(context, numberOfOutputs));
        }
    }
}
