/// <reference path="../../_references.ts" />


module FxAudioEngine.Units.Source {
    'use strict';


    export class FxLiveInputSourceUnit extends FxAudioSourceUnit<MediaStream> {

        private _outputGainNode: AudioNode;

        private _mediStreamSourceNode: MediaStreamAudioSourceNode;

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

            var audioGraph: AudioNode = this._buildAudioGraph();
            var audioInterface: FxUnitInterface = this._buildInterface(audioGraph);

            this._outputGainNode = audioGraph;
            this._ports = audioInterface;
            
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


        private _buildAudioGraph(): AudioNode {
            var audioNode: AudioNode = this.context.audioContext.createGain();

            return audioNode;
        }

        private _buildInterface(audioGraph: AudioNode): FxUnitInterface {
            var output: FxUnitPort = new FxUnitPort(audioGraph, 0, FxUnitPortDirection.OUTPUT);
            var unitInterface = new FxUnitInterface([], [output]);

            return unitInterface;
        }

        private _mountStream(stream: MediaStream): void {
            this._mediStreamSourceNode = this.context.audioContext.createMediaStreamSource(<any>stream);
            this._mediStreamSourceNode.connect(this._outputGainNode);
        }
    }
}
