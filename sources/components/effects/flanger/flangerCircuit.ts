/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FlangerCircuit extends ModulatedComboFilterCircuit {

        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context);
        }
    }
}
