/// <reference path="../_references.ts" />


module FxAudioEngine.Units {
    'use strict';


    export class FxSignalSplitterUnit extends FxUnit<FxSignalSplitterUnitCircuit> {

        constructor(context: FxUnitContext, numberOfOutputs: number = 6) {
            super(new FxSignalSplitterUnitCircuit(context, numberOfOutputs));
        }
    }


    export class FxSignalSplitterUnitCircuit extends FxUnitCircuit {

        constructor(context: FxUnitContext, numberOfOutputs: number) {
            super(context);

            this._buildAudioGraph(numberOfOutputs);
            this._routeAudioGraph();
        }


        private _buildAudioGraph(numberOfOutputs: number): void {
            for (var i = this.inputs.length - 1; i < numberOfOutputs; i++) {
                var outputNode = FxAudioUtilities.WebAudioAPI.createNode(this.context.audioContext, NodeType.GAIN);
                this._addOutputNode(outputNode);
            }

            var inputNode = FxAudioUtilities.WebAudioAPI.createNode(this.context.audioContext, NodeType.GAIN);
            this._addInputNode(inputNode);
        }

        private _routeAudioGraph(): void {
            FxAudioUtilities.WebAudioAPI.routeCross(this.inputs, this.outputs);
        }
    }
}
