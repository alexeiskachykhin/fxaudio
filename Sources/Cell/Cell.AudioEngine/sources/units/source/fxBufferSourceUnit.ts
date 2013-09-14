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


        public get stream(): IFxAudioSourceController {
            return this._audioSourceController;
        }


        constructor(context: FxUnitContext) {
            super(context);

            this._audioSourceNode = context.audioContext.createBufferSource();

            this._ports = this._buildInterface();

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


        private _buildInterface(): FxUnitInterface {
            var ports: FxUnitInterface = FxAudioUtilities.AudioInterface.fromAudioGraph([this._audioSourceNode]);

            return ports;
        }
    }
}
