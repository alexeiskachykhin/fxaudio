/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxSignalSplitterUnit extends FxUnit<FxSignalSplitterUnitCircuit> {

        constructor(context: FxUnitContext, numberOfOutputs: number = 6) {
            super(new FxSignalSplitterUnitCircuit(context, numberOfOutputs));
        }
    }


    export class FxSignalSplitterUnitCircuit extends FxHubUnitCircuit {

        constructor(context: FxUnitContext, numberOfOutputs: number) {
            super(context, 1, numberOfOutputs);
        }
    }
}
