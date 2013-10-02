/// <reference path="../../_references.ts" />


module FxAudioEngine.Units.Source {
    'use strict';


    export class FxLiveInputSourceUnit extends FxAudioSourceUnit<FxLiveInputSourceUnitCircuit, MediaStream> {

        private _audioSourceController: IFxAudioSourceController;


        public get stream(): IFxAudioSourceController {
            return this._audioSourceController;
        }


        constructor(context: FxUnitContext) {
            super(new FxLiveInputSourceUnitCircuit(context));
            
            this._audioSourceController = new FxLiveInputAudioSourceController();
        }


        public init(stream: MediaStream): IFxEventSource {
            var asyncCompletionSource = new FxEventSource();

            try {
                this.circuit.mountStream(stream);
                asyncCompletionSource.dispatchEvent('success');
            }
            catch (e) {
                asyncCompletionSource.dispatchEvent('error', e);
            }

            return asyncCompletionSource;
        }
    }


    export class FxLiveInputSourceUnitCircuit extends FxUnitCircuit {

        private _outputGainNode: GainNode;

        private _mediStreamSourceNode: MediaStreamAudioSourceNode;


        constructor(context: FxUnitContext) {
            super(context);

            this._buildAudioCircuit();
        }


        public mountStream(stream: MediaStream): void {
            this._mediStreamSourceNode = this.context.audioContext.createMediaStreamSource(<any>stream);
            this._mediStreamSourceNode.connect(this._outputGainNode);
        }


        private _buildAudioCircuit(): void {
            this._outputGainNode = this.context.audioContext.createGain();
            this._publishOutputComponent(this._outputGainNode);
        }
    }
}
