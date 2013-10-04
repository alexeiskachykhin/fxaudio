/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxCircuit {

        private _context: FxContext;

        private _inputs: FxUnitPort[];

        private _outputs: FxUnitPort[];


        public get context(): FxContext {
            return this._context;
        }

        public get inputs(): FxUnitPort[] {
            return this._inputs;
        }

        public get outputs(): FxUnitPort[] {
            return this._outputs;
        }


        constructor(context: FxContext) {
            this._context = context;

            this._inputs = [];
            this._outputs = [];
        }


        public _publishInputComponent(audioNode: AudioNode): void {
            FxAudioUtilities.AudioInterface.createPortsFromAudioNode(audioNode, FxUnitPortDirection.INPUT, this._inputs);
        }

        public _publishInputComponents(audioNodes: AudioNode[]): void {
            FxAudioUtilities.AudioInterface.createPortsFromAudioNodes(audioNodes, FxUnitPortDirection.INPUT, this._inputs);
        }


        public _publishOutputComponent(audioNode: AudioNode): void {
            FxAudioUtilities.AudioInterface.createPortsFromAudioNode(audioNode, FxUnitPortDirection.OUTPUT, this._outputs);
        }

        public _publishOutputComponents(audioNodes: AudioNode[]): void {
            FxAudioUtilities.AudioInterface.createPortsFromAudioNodes(audioNodes, FxUnitPortDirection.OUTPUT, this._outputs);
        }
    }
}
