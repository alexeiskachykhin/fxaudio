/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    var DEFAULT_DEPTH = 0.002;
    var DEFAULT_SPEED = 0.25;


    export class FlangerCircuit extends ComboFilterCircuit {

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

            this._createFlangerComponents();
            this._connectFlangerComponents();
        }


        private _createFlangerComponents(): void {
            Contract.isNotNullOrUndefined(this.context, 'context');

            var audioContext: AudioContext = this.context.audioContext;

            this._depthNode = audioContext.createGain();
            this._depthNode.gain.value = DEFAULT_DEPTH;

            this._lfoNode = audioContext.createOscillator();
            this._lfoNode.frequency.value = DEFAULT_SPEED;
            this._lfoNode.start(0);
        }

        private _connectFlangerComponents(): void {
            Contract.isNotNullOrUndefined(this._lfoNode, '_lfoNode');
            Contract.isNotNullOrUndefined(this._depthNode, '_depthNode');
            Contract.isNotNullOrUndefined(this.delayNode, 'delayNode');

            this._lfoNode.connect(this._depthNode);
            this._depthNode.connect(this.delayNode.delayTime);
        }
    }
}
