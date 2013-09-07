/// <reference path="../../../libraries/waa.d.ts" />

/// <reference path="../../fxAudioEngine.ts" />
/// <reference path="../../fxAudioNode.ts" />
/// <reference path="fxAudioStreamingController.ts" />
/// <reference path="fxAudioStreamingNode.ts" />
/// <reference path="fxBufferSourceNodeStreamingController.ts" />


module FxAudioEngine.Nodes.Source {
    'use strict';


    export enum FxAudioBufferState {
        NODATA = 0,
        DECODING = 1,
        READY = 2
    };


    export class FxBufferSourceNode extends FxAudioNode implements IFxAudioStreamingNode {

        private _bufferState: FxAudioBufferState;

        private _audioSourceNode: AudioBufferSourceNode;

        private _streamingController: IFxAudioStreamingController;


        public get stream(): IFxAudioStreamingController {
            return this._streamingController;
        }


        constructor() {
            var audioGraph = this._buildAudioGraph();

            super(audioGraph, null, false);


            this._streamingController = new FxBufferSourceNodeStreamingController(this._audioSourceNode);
        }


        public fill(audioData: ArrayBuffer): IFxAudioEventSource {
            this._bufferState = FxAudioBufferState.DECODING;


            var asyncCompletionSource = new FxAudioEventSource();

            FxAudioEngine.context.decodeAudioData(
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


        private _buildAudioGraph(): AudioNode[] {
            var audioNode: AudioBufferSourceNode = FxAudioEngine.context.createBufferSource();
            var audioGraph: AudioNode[] = [audioNode];

            this._audioSourceNode = audioNode;

            return audioGraph;
        }
    }
}