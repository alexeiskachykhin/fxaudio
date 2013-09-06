/// <reference path="../../libraries/waa.d.ts" />

/// <reference path="../fxAudioNode.ts" />
/// <reference path="../fxAudioEngine.ts" />


module FxAudioEngine.Nodes {
    'use strict';


    export enum FxAudioBufferState {
        NODATA = 0,
        DECODING = 1,
        READY = 2
    };


    export class FxBufferSourceNode extends FxAudioNode {

        private _bufferState: FxAudioBufferState;

        private _audioSourceNode: AudioBufferSourceNode;


        constructor() {
            var audioGraph = this._buildAudioGraph();

            super(audioGraph, null, false);
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

        public play(time: number): void {
            if (this._bufferState !== FxAudioBufferState.READY) {
                throw new Error("Buffer is not ready to be played.");
            }

            this._audioSourceNode.start(time);
        }


        private _buildAudioGraph(): AudioNode[] {
            var audioNode: AudioBufferSourceNode = FxAudioEngine.context.createBufferSource();
            var audioGraph: AudioNode[] = [audioNode];

            this._audioSourceNode = audioNode;

            return audioGraph;
        }
    }
}