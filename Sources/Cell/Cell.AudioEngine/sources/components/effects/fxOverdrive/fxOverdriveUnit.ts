/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxOverdriveUnit extends FxUnit<FxOverdriveCircuit> {

        constructor(context: FxContext) {
            super(new FxOverdriveCircuit(context));
        }
    }
}
