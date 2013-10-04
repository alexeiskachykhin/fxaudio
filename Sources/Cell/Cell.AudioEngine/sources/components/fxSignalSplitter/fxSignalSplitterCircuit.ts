/// <reference path="../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxSignalSplitterCircuit extends FxSignalHubCircuit {

        constructor(context: FxContext, numberOfOutputs: number) {
            super(context, 1, numberOfOutputs);
        }
    }
}
