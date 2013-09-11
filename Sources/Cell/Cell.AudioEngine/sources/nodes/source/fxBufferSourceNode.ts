/// <reference path="../../_references.ts" />


module FxAudioEngine.Nodes.Source {
    'use strict';


    export enum FxAudioBufferState {
        NODATA = 0,
        DECODING = 1,
        READY = 2
    };


    export class FxBufferSourceNode extends FxAudioSourceNode<ArrayBuffer> {

        private _bufferState: FxAudioBufferState;

        private _audioSourceNode: AudioBufferSourceNode;

        private _audioSourceController: IFxAudioSourceController;


        public get stream(): IFxAudioSourceController {
            return this._audioSourceController;
        }


        constructor(audioContext: FxAudioContext) {
            var audioGraph = this._buildAudioGraph(audioContext);

            super(audioContext, audioGraph, null, false);

            this._audioSourceController = new FxBufferAudioSourceController(this._audioSourceNode);
        }


        public init(audioData: ArrayBuffer): IFxAudioEventSource {
            this._bufferState = FxAudioBufferState.DECODING;

            var asyncCompletionSource = new FxAudioEventSource();

            this.audioContext.audioContext.decodeAudioData(
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


        private _buildAudioGraph(audioContext: FxAudioContext): AudioNode[] {
            var audioNode: AudioBufferSourceNode = audioContext.audioContext.createBufferSource();
            var audioGraph: AudioNode[] = [audioNode];

            this._audioSourceNode = audioNode;

            return audioGraph;
        }
    }
}
