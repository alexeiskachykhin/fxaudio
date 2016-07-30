/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    export class FlangerCircuit extends ModulatedComboFilterCircuit {

        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context);
        }
    }
}
