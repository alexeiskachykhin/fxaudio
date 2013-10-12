/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class SignalMergerUnit extends Unit<SignalMergerCircuit> {

        constructor(context: Context, numberOfInputs: number = 6) {
            super(new SignalMergerCircuit(context, numberOfInputs));
        }
    }
}
