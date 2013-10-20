/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class ModulatedComboFilterCircuit extends ComboFilterCircuit {

        private _depthNode: GainNode;

        private _lfoNode: OscillatorNode;


        public get lfoNode(): OscillatorNode {
            return this._lfoNode;
        }

        public get depthNode(): GainNode {
            return this._depthNode;
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context);

            this._createModulatedComboFilterComponents();
            this._connectModulatedComboFilterComponents();
        }


        private _createModulatedComboFilterComponents(): void {
            Contract.isNotNullOrUndefined(this.context, 'context');

            var audioContext: AudioContext = this.context.audioContext;

            this._depthNode = audioContext.createGain();

            this._lfoNode = audioContext.createOscillator();
            this._lfoNode.start(0);
        }

        private _connectModulatedComboFilterComponents(): void {
            Contract.isNotNullOrUndefined(this._lfoNode, '_lfoNode');
            Contract.isNotNullOrUndefined(this._depthNode, '_depthNode');
            Contract.isNotNullOrUndefined(this.delayNode, 'delayNode');

            this._lfoNode.connect(this._depthNode);
            this._depthNode.connect(this.delayNode.delayTime);
        }
    }
}
