/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class SignalMergerCircuit extends SignalHubCircuit {

        constructor(context: Context, numberOfInputs: number) {
            super(context, numberOfInputs, 1);
        }
    }
}
