/// <reference path="../../../_references.ts" />


namespace FXAudio {
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
            Contract.isNotNullOrUndefined(context, 'context');

            super(new BufferSourceCircuit(context));

            this._audioSourceController = new BufferAudioSourceController(this._audioSourceNode);
        }


        public init(audioData: ArrayBuffer): IEventSource {
            Contract.isNotNullOrUndefined(audioData, 'audioData');

            this._bufferState = AudioBufferState.DECODING;

            const asyncCompletionSource = new EventSource();
           
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
