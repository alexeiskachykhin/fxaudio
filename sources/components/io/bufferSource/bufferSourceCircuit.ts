/// <reference path="../../../_references.ts" />


module FXAudio {
    'use strict';


    export class BufferSourceCircuit extends AdapterCircuit<AudioBufferSourceNode> {
        
        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context, NodeType.BUFFER_SOURCE);
        }
    }
}
