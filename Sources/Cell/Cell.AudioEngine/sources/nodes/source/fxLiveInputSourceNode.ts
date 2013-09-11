/// <reference path="../../../libraries/waa.d.ts" />
/// <reference path="../../../libraries/MediaStream.d.ts" />

/// <reference path="../../fxAudioContext.ts" />
/// <reference path="../../fxAudioNode.ts" />
/// <reference path="../../fxAudioEventSource.ts" />

/// <reference path="fxAudioSourceNode.ts" />
/// <reference path="fxAudioSourceController.ts" />
/// <reference path="fxLiveInputAudioSourceController.ts" />


module FxAudioEngine.Nodes.Source {
    'use strict';


    export class FxLiveInputSourceNode extends FxAudioSourceNode<MediaStream> {

        private _outputGainNode: AudioNode;

        private _mediStreamSourceNode: MediaStreamAudioSourceNode;

        private _audioSourceController: IFxAudioSourceController;


        public get stream(): IFxAudioSourceController {
            return this._audioSourceController;
        }


        constructor(audioContext: FxAudioContext) {
            var audioGraph = this._buildAudioGraph(audioContext);
            var audioInterface = this._buildAudioInterface(audioGraph);

            super(audioContext, audioGraph, audioInterface, false);


            this._audioSourceController = new FxLiveInputAudioSourceController();
        }


        public init(stream: MediaStream): IFxAudioEventSource {
            var asyncCompletionSource = new FxAudioEventSource();

            try {
                this._mountStream(stream);
                asyncCompletionSource.dispatchEvent('success');
            }
            catch(e) {
                asyncCompletionSource.dispatchEvent('error', e);
            }
            
            return asyncCompletionSource;
        }


        private _buildAudioGraph(audioContext: FxAudioContext): AudioNode[] {
            var audioNode: AudioNode = audioContext.audioContext.createGain();
            var audioGraph: AudioNode[] = [audioNode];

            this._outputGainNode = audioNode;

            return audioGraph;
        }

        private _buildAudioInterface(audioGraph: AudioNode[]) {
            var outputNode = audioGraph[audioGraph.length - 1];
            var output: FxAudioPort = new FxAudioPort(outputNode, FxAudioPortDirection.OUTPUT);

            var audioInterface = new FxAudioNodeInterface(
                [],
                [output]);

            return audioInterface;
        }

        private _mountStream(stream: MediaStream): void {
            this._mediStreamSourceNode = this.audioContext.audioContext.createMediaStreamSource(<any>stream);
            this._mediStreamSourceNode.connect(this._outputGainNode);
        } 
    }
}
