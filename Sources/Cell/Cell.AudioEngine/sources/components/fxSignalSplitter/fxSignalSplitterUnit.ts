/// <reference path="../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxSignalSplitterUnit extends FxUnit<FxSignalSplitterCircuit> {

        constructor(context: FxContext, numberOfOutputs: number = 6) {
            super(new FxSignalSplitterCircuit(context, numberOfOutputs));
        }
    }
}
