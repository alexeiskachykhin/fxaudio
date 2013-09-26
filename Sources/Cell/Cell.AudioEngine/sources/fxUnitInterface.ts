/// <reference path="_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxUnitInterface {

        public inputs: FxUnitPort[];

        public outputs: FxUnitPort[];

        public bypass: FxUnitPort[];


        constructor(audioCircuit: FxAudioCircuit) {
            this.inputs = this._createPorts(audioCircuit.inputs, FxUnitPortDirection.INPUT);
            this.outputs = this._createPorts(audioCircuit.outputs, FxUnitPortDirection.OUTPUT);
        }


        private _createPorts(audioNodes: AudioNode[], portDirection: FxUnitPortDirection): FxUnitPort[] {
            var ports: FxUnitPort[] = [];

            for (var i = 0; i < audioNodes.length; i++) {
                var audioNode: AudioNode = audioNodes[i];

                if (audioNode) {
                    FxAudioUtilities.AudioInterface.createPortsFromAudioNode(audioNode, portDirection, ports);
                }
            }

            return ports;
        }
    }
}
