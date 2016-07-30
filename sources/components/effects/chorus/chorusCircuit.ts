/// <reference path="../../../_references.ts" />


namespace FXAudio {
    'use strict';


    const DEFAULT_FEEDBACK = 0;
    const DEFAULT_DELAY_TIME = 0.010;


    export class ChorusCircuit extends ModulatedComboFilterCircuit {

        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context);

            this.feedbackNode.gain.value = DEFAULT_FEEDBACK;
            this.delayNode.delayTime.value = DEFAULT_DELAY_TIME;
        }
    }
}
