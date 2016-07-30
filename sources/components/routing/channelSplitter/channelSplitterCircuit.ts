 /// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    export class ChannelSplitterCircuit extends AdapterCircuit<ChannelSplitterNode> {

        constructor(context: Context, numberOfOutputs: number) {
            Contract.isNotNullOrUndefined(context, 'context');
            Contract.isPositiveOrZero(numberOfOutputs, 'numberOfOutputs');

            super(context, NodeType.CHANNEL_SPLITTER, numberOfOutputs);
        }
    }
}
