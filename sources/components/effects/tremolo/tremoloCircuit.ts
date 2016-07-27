/// <reference path="../../../_references.ts" />


module FXAudio {
    'use strict';


    export class TremoloCircuit extends Circuit {

        private _depthNode: GainNode;

        private _lfoNode: OscillatorNode;

        private _gainNode: GainNode;


        public get lfoNode(): OscillatorNode {
            return this._lfoNode;
        }

        public get depthNode(): GainNode {
            return this._depthNode;
        }

        public get gainNode(): GainNode {
            return this._gainNode;
        }


        constructor(context: Context) {
            Contract.isNotNullOrUndefined(context, 'context');

            super(context);

            this._createTremoloComponents();
            this._connectTremoloComponents();
            this._publishTremoloComponents();
        }


        private _createTremoloComponents(): void {
            Contract.isNotNullOrUndefined(this.context, 'context');

            var audioContext: AudioContext = this.context.audioContext;

            this._depthNode = audioContext.createGain();

            this._lfoNode = audioContext.createOscillator();
            this._lfoNode.start(0);

            this._gainNode = audioContext.createGain();
        }

        private _connectTremoloComponents(): void {
            Contract.isNotNullOrUndefined(this._lfoNode, '_lfoNode');
            Contract.isNotNullOrUndefined(this._depthNode, '_depthNode');
            Contract.isNotNullOrUndefined(this._depthNode, '_gainNode');

            this._lfoNode.connect(this._depthNode);
            this._depthNode.connect(this._gainNode.gain);
        }

        private _publishTremoloComponents(): void {
            Contract.isNotNullOrUndefined(this._gainNode, '_gainNode');

            this._publishInputComponent(this._gainNode);
            this._publishOutputComponent(this._gainNode);
        }
    }
}
