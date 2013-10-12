/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class AudioDestinationCircuit extends AdapterCircuit<AudioDestinationNode> {

        constructor(context: Context) {
            super(context, NodeType.DESTINATION);
        }
    }
}
