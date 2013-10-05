/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAudioDestinationCircuit extends FxAdapterCircuit<AudioDestinationNode> {

        constructor(context: FxContext) {
            super(context, NodeType.DESTINATION);
        }
    }
}
