/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxChannelMergerUnit extends FxUnit<FxChannelMergerCircuit> {

        constructor(context: FxContext, numberOfInputs: number = 6) {
            super(new FxChannelMergerCircuit(context, numberOfInputs));
        }
    }
}
