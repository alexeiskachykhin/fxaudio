/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxHubUnitCircuit extends FxUnitCircuit {

        constructor(context: FxUnitContext, numberOfInputs: number, numberOfOutputs: number) {
            super(context);

            this._buildAudioGraph(numberOfInputs, numberOfOutputs);
            this._routeAudioGraph();
        }


        private _buildAudioGraph(numberOfInputs: number, numberOfOutputs: number): void {
            this._buildInputs(numberOfInputs);
            this._buildOutputs(numberOfOutputs);
        }

        private _buildInputs(numberOfInputs: number): void {
            for (var i = 0; i < numberOfInputs; i++) {
                var inputNode = FxAudioUtilities.WebAudioAPI.createNode(this.context.audioContext, NodeType.GAIN);
                this._addInputNode(inputNode);
            }
        }

        private _buildOutputs(numberOfOutputs: number): void {
            for (var i = 0; i < numberOfOutputs; i++) {
                var outputNode = FxAudioUtilities.WebAudioAPI.createNode(this.context.audioContext, NodeType.GAIN);
                this._addOutputNode(outputNode);
            }
        }

        private _routeAudioGraph(): void {
            FxAudioUtilities.WebAudioAPI.routeCross(this.inputs, this.outputs);
        }
    }
}
