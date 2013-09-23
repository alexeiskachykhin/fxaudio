/// <reference path="../../_references.ts" />


module FxAudioEngine.Units.Source {
    'use strict';


    export enum FxAudioBufferState {
        NODATA = 0,
        DECODING = 1,
        READY = 2
    };


    export class FxBufferSourceUnit extends FxAudioSourceUnit<FxBufferSourceUnitBuilder, ArrayBuffer> {

        private _bufferState: FxAudioBufferState;

        private _audioSourceController: IFxAudioSourceController;

        
        private get _audioSourceNode(): AudioBufferSourceNode {
            return this.builder.audioNode;
        }


        public get stream(): IFxAudioSourceController {
            return this._audioSourceController;
        }


        constructor(context: FxUnitContext) {
            super(context, new FxBufferSourceUnitBuilder());

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


    export class FxBufferSourceUnitBuilder extends FxAdapterUnitBuilder<AudioBufferSourceNode> {
        
        constructor() {
            super(NodeType.BUFFER_SOURCE);
        }
    }
}
