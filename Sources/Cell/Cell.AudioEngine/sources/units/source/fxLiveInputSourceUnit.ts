/// <reference path="../../_references.ts" />


module FxAudioEngine.Units.Source {
    'use strict';


    export class FxLiveInputSourceUnit extends FxAudioSourceUnit<MediaStream> {

        private _outputGainNode: AudioNode;

        private _mediStreamSourceNode: MediaStreamAudioSourceNode;

        private _audioSourceController: IFxAudioSourceController;


        public get stream(): IFxAudioSourceController {
            return this._audioSourceController;
        }


        constructor(unitContext: FxUnitContext) {
            var audioInterface: FxUnitInterface = this._buildUnitInterface(unitContext);

            super(unitContext, audioInterface);

            this._audioSourceController = new FxLiveInputAudioSourceController();
        }


        public init(stream: MediaStream): IFxEventSource {
            var asyncCompletionSource = new FxEventSource();

            try {
                this._mountStream(stream);
                asyncCompletionSource.dispatchEvent('success');
            }
            catch (e) {
                asyncCompletionSource.dispatchEvent('error', e);
            }

            return asyncCompletionSource;
        }

        private _buildUnitInterface(unitContext: FxUnitContext): FxUnitInterface {
            this._outputGainNode = unitContext.audioContext.createGain();
            var outputPort: FxUnitPort = new FxUnitPort(this._outputGainNode, FxUnitPortDirection.OUTPUT);

            return new FxUnitInterface([], [outputPort]);
        }

        private _mountStream(stream: MediaStream): void {
            this._mediStreamSourceNode = this.unitContext.audioContext.createMediaStreamSource(<any>stream);
            this._mediStreamSourceNode.connect(this._outputGainNode);
        }
    }
}
