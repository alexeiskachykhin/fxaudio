/// <reference path="../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxBufferSourceCircuit extends FxAdapterCircuit<AudioBufferSourceNode> {
        
        constructor(context: FxContext) {
            super(context, NodeType.BUFFER_SOURCE);
        }
    }
}
