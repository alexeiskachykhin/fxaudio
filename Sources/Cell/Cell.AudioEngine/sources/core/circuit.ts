/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class Circuit {

        private _context: Context;

        private _inputs: UnitPort[];

        private _outputs: UnitPort[];


        public get context(): Context {
            return this._context;
        }

        public get inputs(): UnitPort[] {
            return this._inputs;
        }

        public get outputs(): UnitPort[] {
            return this._outputs;
        }


        constructor(context: Context) {
            this._context = context;

            this._inputs = [];
            this._outputs = [];
        }


        public _publishInputComponent(audioNode: AudioNode): void {
            AudioUtilities.AudioInterface.createPortsFromAudioNode(audioNode, UnitPortDirection.INPUT, this._inputs);
        }

        public _publishInputComponents(audioNodes: AudioNode[]): void {
            AudioUtilities.AudioInterface.createPortsFromAudioNodes(audioNodes, UnitPortDirection.INPUT, this._inputs);
        }


        public _publishOutputComponent(audioNode: AudioNode): void {
            AudioUtilities.AudioInterface.createPortsFromAudioNode(audioNode, UnitPortDirection.OUTPUT, this._outputs);
        }

        public _publishOutputComponents(audioNodes: AudioNode[]): void {
            AudioUtilities.AudioInterface.createPortsFromAudioNodes(audioNodes, UnitPortDirection.OUTPUT, this._outputs);
        }
    }
}
