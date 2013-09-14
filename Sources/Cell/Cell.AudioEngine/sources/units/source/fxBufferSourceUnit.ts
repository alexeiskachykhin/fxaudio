/// <reference path="../../_references.ts" />


module FxAudioEngine.Units.Source {
    'use strict';


    export enum FxAudioBufferState {
        NODATA = 0,
        DECODING = 1,
        READY = 2
    };


    export class FxBufferSourceUnit extends FxAudioSourceUnit<ArrayBuffer> {

        private _bufferState: FxAudioBufferState;

        private _audioSourceNode: AudioBufferSourceNode;

        private _audioSourceController: IFxAudioSourceController;

        private _ports: FxUnitInterface;


        public get stream(): IFxAudioSourceController {
            return this._audioSourceController;
        }

        public get ports(): FxUnitInterface {
            return this._ports;
        }


        constructor(context: FxUnitContext) {
            super(context);

            var audioGraph: AudioBufferSourceNode = this._buildAudioGraph();
            var audioInterface: FxUnitInterface = this._buildInterface(audioGraph);

            this._audioSourceNode = audioGraph;
            this._audioSourceController = new FxBufferAudioSourceController(audioGraph);

            this._ports = audioInterface;
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


        private _buildAudioGraph(): AudioBufferSourceNode {
            var audioSourceNode: AudioBufferSourceNode = this.context.audioContext.createBufferSource();

            return audioSourceNode;
        }

        private _buildInterface(audioGraph: AudioNode): FxUnitInterface {
            var ports: FxUnitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph([audioGraph]);

            return ports;
        }
    }
}
