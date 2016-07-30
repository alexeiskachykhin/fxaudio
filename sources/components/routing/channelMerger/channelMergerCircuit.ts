/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    export class ChannelMergerCircuit extends AdapterCircuit<ChannelMergerNode> {

        constructor(context: Context, numberOfInputs: number) {
            Contract.isNotNullOrUndefined(context, 'context');
            Contract.isPositiveOrZero(numberOfInputs, 'numberOfInputs');

            super(context, NodeType.CHANNEL_MERGER, numberOfInputs);
        }
    }
}
