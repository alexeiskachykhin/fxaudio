/// <reference path="../../../_references.ts" />


module FxAudioEngine {
    'use strict';


    export enum AudioBufferState {
        NODATA = 0,
        DECODING = 1,
        READY = 2
    };


    export class BufferSourceUnit extends AudioSourceUnit<BufferSourceCircuit, ArrayBuffer> {

        private _bufferState: AudioBufferState;

        private _audioSourceController: IAudioSourceController;

        
        private get _audioSourceNode(): AudioBufferSourceNode {
            return this.circuit.audioNode;
        }


        public get stream(): IAudioSourceController {
            return this._audioSourceController;
        }


        constructor(context: Context) {
            super(new BufferSourceCircuit(context));

            this._audioSourceController = new BufferAudioSourceController(this._audioSourceNode);
        }


        public init(audioData: ArrayBuffer): IEventSource {
            this._bufferState = AudioBufferState.DECODING;

            var asyncCompletionSource = new EventSource();
           
            this.context.audioContext.decodeAudioData(
                audioData,

                (audioBuffer: AudioBuffer) => {
                    this._audioSourceNode.buffer = audioBuffer;
                    this._bufferState = AudioBufferState.READY;

                    asyncCompletionSource.dispatchEvent('success');
                },

                () => {
                    this._audioSourceNode.buffer = null;
                    this._bufferState = AudioBufferState.NODATA;

                    asyncCompletionSource.dispatchEvent('error');
                });

            return asyncCompletionSource;
        }
    }
}
