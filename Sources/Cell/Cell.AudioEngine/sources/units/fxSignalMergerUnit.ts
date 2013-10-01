/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxSignalMergerUnit extends FxUnit<FxSignalMergerUnitCircuit> {

        constructor(context: FxUnitContext, numberOfInputs: number = 6) {
            super(new FxSignalMergerUnitCircuit(context, numberOfInputs));
        }
    }


    export class FxSignalMergerUnitCircuit extends FxHubUnitCircuit {

        constructor(context: FxUnitContext, numberOfInputs: number) {
            super(context, numberOfInputs, 1);
        }
    }
}
