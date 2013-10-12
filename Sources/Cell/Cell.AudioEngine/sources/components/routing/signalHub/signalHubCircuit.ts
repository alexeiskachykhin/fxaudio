/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class SignalHubCircuit extends Circuit {

        constructor(context: Context, numberOfInputs: number, numberOfOutputs: number) {
            Contract.isNotNullOrUndefined(context, 'context');
            Contract.isPositiveOrZero(numberOfInputs, 'numberOfInputs');
            Contract.isPositiveOrZero(numberOfOutputs, 'numberOfOutputs');

            super(context);

            this._buildAudioCircuit(numberOfInputs, numberOfOutputs);
        }


        private _buildAudioCircuit(numberOfInputs: number, numberOfOutputs: number): void {
            var inputs = this._createNodeGroup(numberOfInputs);
            var outputs = this._createNodeGroup(numberOfOutputs);

            AudioUtilities.WebAudioAPI.routeCross(inputs, outputs);

            this._publishInputComponents(inputs);
            this._publishOutputComponents(outputs);
        }

        private _createNodeGroup(numberOfNodes: number): AudioNode[] {
            var nodes: AudioNode[] = [];

            for (var i = 0; i < numberOfNodes; i++) {
                var node = AudioUtilities.WebAudioAPI.createNode(this.context.audioContext, NodeType.GAIN);
                nodes.push(node);
            }

            return nodes;
        }
    }
}
