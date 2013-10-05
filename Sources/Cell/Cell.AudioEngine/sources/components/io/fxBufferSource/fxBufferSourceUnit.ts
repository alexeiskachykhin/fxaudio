/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export enum FxAudioBufferState {
        NODATA = 0,
        DECODING = 1,
        READY = 2
    };


    export class FxBufferSourceUnit extends FxAudioSourceUnit<FxBufferSourceCircuit, ArrayBuffer> {

        private _bufferState: FxAudioBufferState;

        private _audioSourceController: IFxAudioSourceController;

        
        private get _audioSourceNode(): AudioBufferSourceNode {
            return this.circuit.audioNode;
        }


        public get stream(): IFxAudioSourceController {
            return this._audioSourceController;
        }


        constructor(context: FxContext) {
            super(new FxBufferSourceCircuit(context));

            this._audioSourceController = new FxBufferAudioSourceController(this._audioSourceNode);
        }


        public init(audioData: ArrayBuffer): IFxEventSource {
            this._bufferState = FxAudioBufferState.DECODING;

            var asyncCompletionSource = new FxEventSource();
           
            this.context.audioContext.decodeAudioData(
                audioData,

                (audioBuffer: AudioBuffer) => {
                    this._audioSourceNode.buffer = audioBuffer;
                    this._bufferState = FxAudioBufferState.READY;

                    asyncCompletionSource.dispatchEvent('success');
                },

                () => {
                    this._audioSourceNode.buffer = null;
                    this._bufferState = FxAudioBufferState.NODATA;

                    asyncCompletionSource.dispatchEvent('error');
                });

            return asyncCompletionSource;
        }
    }
}
