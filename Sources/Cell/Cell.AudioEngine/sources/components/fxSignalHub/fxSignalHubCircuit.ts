/// <reference path="../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxSignalHubCircuit extends FxCircuit {

        constructor(context: FxContext, numberOfInputs: number, numberOfOutputs: number) {
            super(context);

            this._buildAudioCircuit(numberOfInputs, numberOfOutputs);
        }


        private _buildAudioCircuit(numberOfInputs: number, numberOfOutputs: number): void {
            var inputs = this._createNodeGroup(numberOfInputs);
            var outputs = this._createNodeGroup(numberOfOutputs);

            FxAudioUtilities.WebAudioAPI.routeCross(inputs, outputs);

            this._publishInputComponents(inputs);
            this._publishOutputComponents(outputs);
        }

        private _createNodeGroup(numberOfNodes: number): AudioNode[] {
            var nodes: AudioNode[] = [];

            for (var i = 0; i < numberOfNodes; i++) {
                var node = FxAudioUtilities.WebAudioAPI.createNode(this.context.audioContext, NodeType.GAIN);
                nodes.push(node);
            }

            return nodes;
        }
    }
}
