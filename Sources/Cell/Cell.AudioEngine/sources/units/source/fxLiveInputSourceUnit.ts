/// <reference path="../../../libraries/waa.d.ts" />
/// <reference path="../../../libraries/MediaStream.d.ts" />

/// <reference path="../../fxUnitContext.ts" />
/// <reference path="../../fxUnit.ts" />
/// <reference path="../../fxEventSource.ts" />

/// <reference path="fxAudioSourceUnit.ts" />
/// <reference path="fxAudioSourceController.ts" />
/// <reference path="fxLiveInputAudioSourceController.ts" />


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
            var audioGraph = this._buildAudioGraph(unitContext);
            var audioInterface = this._buildAudioInterface(audioGraph);

            super(unitContext, audioGraph, audioInterface, false);

            this._audioSourceController = new FxLiveInputAudioSourceController();
        }


        public init(stream: MediaStream): IFxEventSource {
            var asyncCompletionSource = new FxEventSource();

            try {
                this._mountStream(stream);
                asyncCompletionSource.dispatchEvent('success');
            }
            catch(e) {
                asyncCompletionSource.dispatchEvent('error', e);
            }
            
            return asyncCompletionSource;
        }


        private _buildAudioGraph(unitContext: FxUnitContext): AudioNode[] {
            var audioNode: AudioNode = unitContext.audioContext.createGain();
            var audioGraph: AudioNode[] = [audioNode];

            this._outputGainNode = audioNode;

            return audioGraph;
        }

        private _buildAudioInterface(audioGraph: AudioNode[]) {
            var outputNode = audioGraph[audioGraph.length - 1];
            var output: FxUnitPort = new FxUnitPort(outputNode, FxUnitPortDirection.OUTPUT);

            var unitInterface = new FxUnitInterface(
                [],
                [output]);

            return unitInterface;
        }

        private _mountStream(stream: MediaStream): void {
            this._mediStreamSourceNode = this.unitContext.audioContext.createMediaStreamSource(<any>stream);
            this._mediStreamSourceNode.connect(this._outputGainNode);
        } 
    }
}
