 /// <reference path="../../../_references.ts" />


module FXAudio {
    'use strict';


    export class ChannelSplitterUnit extends Unit<ChannelSplitterCircuit> {

        constructor(context: Context, numberOfOutputs: number = 6) {
            Contract.isNotNullOrUndefined(context, 'context');
            Contract.isPositiveOrZero(numberOfOutputs, 'numberOfOutputs');

            super(new ChannelSplitterCircuit(context, numberOfOutputs));
        }
    }
}
