 /// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class ChannelSplitterUnit extends Unit<ChannelSplitterCircuit> {

        constructor(context: Context, numberOfOutputs: number = 6) {
            super(new ChannelSplitterCircuit(context, numberOfOutputs));
        }
    }
}
