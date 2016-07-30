/// <reference path="../_references.ts" />


module FXAudio {
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
            Contract.isNotNullOrUndefined(context, 'context');

            this._context = context;

            this._inputs = [];
            this._outputs = [];
        }


        protected _publishInputComponent(audioNode: AudioNode): void {
            Contract.isNotNullOrUndefined(audioNode, 'audioNode');

            AudioUtilities.AudioInterface.createPortsFromAudioNode(audioNode, UnitPortDirection.INPUT, this._inputs);
        }

        protected _publishInputComponents(audioNodes: AudioNode[]): void {
            Contract.isNotNullOrUndefined(audioNodes, 'audioNodes');

            AudioUtilities.AudioInterface.createPortsFromAudioNodes(audioNodes, UnitPortDirection.INPUT, this._inputs);
        }


        protected _publishOutputComponent(audioNode: AudioNode): void {
            Contract.isNotNullOrUndefined(audioNode, 'audioNode');

            AudioUtilities.AudioInterface.createPortsFromAudioNode(audioNode, UnitPortDirection.OUTPUT, this._outputs);
        }

        protected _publishOutputComponents(audioNodes: AudioNode[]): void {
            Contract.isNotNullOrUndefined(audioNodes, 'audioNodes');

            AudioUtilities.AudioInterface.createPortsFromAudioNodes(audioNodes, UnitPortDirection.OUTPUT, this._outputs);
        }
    }
}
