/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxSignalMergerCircuit extends FxSignalHubCircuit {

        constructor(context: FxContext, numberOfInputs: number) {
            super(context, numberOfInputs, 1);
        }
    }
}
