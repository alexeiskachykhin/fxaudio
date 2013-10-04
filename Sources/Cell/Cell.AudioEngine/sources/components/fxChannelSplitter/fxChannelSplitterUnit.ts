 /// <reference path="../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxChannelSplitterUnit extends FxUnit<FxChannelSplitterCircuit> {

        constructor(context: FxContext, numberOfOutputs: number = 6) {
            super(new FxChannelSplitterCircuit(context, numberOfOutputs));
        }
    }
}
