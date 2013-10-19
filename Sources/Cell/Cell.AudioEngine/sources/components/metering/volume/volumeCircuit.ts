/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class VolumeCircuit extends AdapterCircuit<GainNode> {

        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context, NodeType.GAIN);
        }
    }
}
