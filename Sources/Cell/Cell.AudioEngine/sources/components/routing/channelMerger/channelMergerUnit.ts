/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class ChannelMergerUnit extends Unit<ChannelMergerCircuit> {

        constructor(context: Context, numberOfInputs: number = 6) {
            super(new ChannelMergerCircuit(context, numberOfInputs));
        }
    }
}
