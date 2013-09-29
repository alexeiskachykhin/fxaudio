/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxSignalMergerUnit extends FxUnit<FxSignalMergerUnitCircuit> {

        constructor(context: FxUnitContext, numberOfInputs: number = 6) {
            super(new FxSignalMergerUnitCircuit(context, numberOfInputs));
        }
    }


    export class FxSignalMergerUnitCircuit extends FxAdapterUnitCircuit<GainNode> {

        constructor(context: FxUnitContext, numberOfInputs: number) {
            super(context, NodeType.GAIN);

            this._connectInputs(numberOfInputs);
        }


        private _connectInputs(numberOfInputs: number): void {
            for (var i = this.inputs.length - 1; i < numberOfInputs; i++) {
                this._addInputNode(this.audioNode);
            }
        }
    }
}
