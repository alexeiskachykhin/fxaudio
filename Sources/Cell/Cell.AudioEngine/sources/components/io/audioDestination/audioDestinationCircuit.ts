/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class AudioDestinationCircuit extends AdapterCircuit<AudioDestinationNode> {

        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context, NodeType.DESTINATION);
        }
    }
}
