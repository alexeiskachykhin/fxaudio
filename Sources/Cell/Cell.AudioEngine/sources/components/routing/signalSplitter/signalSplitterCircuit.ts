/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class SignalSplitterCircuit extends SignalHubCircuit {

        constructor(context: Context, numberOfOutputs: number) {
            super(context, 1, numberOfOutputs);
        }
    }
}
