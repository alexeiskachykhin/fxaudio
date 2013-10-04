/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxSignalMergerUnit extends FxUnit<FxSignalMergerCircuit> {

        constructor(context: FxContext, numberOfInputs: number = 6) {
            super(new FxSignalMergerCircuit(context, numberOfInputs));
        }
    }
}
