/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class OverdriveUnit extends Unit<OverdriveCircuit> {

        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(new OverdriveCircuit(context));
        }
    }
}
