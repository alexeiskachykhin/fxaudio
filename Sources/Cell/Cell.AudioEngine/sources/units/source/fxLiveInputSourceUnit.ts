/// <reference path="../../_references.ts" />


module FxAudioEngine.Units.Source {
    'use strict';


    export class FxLiveInputSourceUnit extends FxAudioSourceUnit<MediaStream> {

        private _audioSourceController: IFxAudioSourceController;


        public get stream(): IFxAudioSourceController {
            return this._audioSourceController;
        }


        constructor(context: FxUnitContext) {
            super(context, new FxLiveInputSourceUnitBuilder());
            
            this._audioSourceController = new FxLiveInputAudioSourceController();
        }


        public init(stream: MediaStream): IFxEventSource {
            var asyncCompletionSource = new FxEventSource();

            try {
                (<any>this.builder).mountStream(stream);
                asyncCompletionSource.dispatchEvent('success');
            }
            catch (e) {
                asyncCompletionSource.dispatchEvent('error', e);
            }

            return asyncCompletionSource;
        }
    }


    class FxLiveInputSourceUnitBuilder implements IFxUnitBuilder {

        private _outputGainNode: GainNode;

        private _mediStreamSourceNode: MediaStreamAudioSourceNode;


        public buildAudioGraph(unitContext: FxUnitContext): AudioNode[] {
            var audioNode: GainNode = unitContext.audioContext.createGain();
            var audioGraph: AudioNode[] = [audioNode];

            this._outputGainNode = audioNode;

            return audioGraph;
        }

        public buildAudioInterface(audioGraph: AudioNode[]): FxUnitInterface {
            var output: FxUnitPort = new FxUnitPort(audioGraph[0], 0, FxUnitPortDirection.OUTPUT);
            var audioInterface = new FxUnitInterface([], [output]);

            return audioInterface;
        }

        public mountStream(unitContext: FxUnitContext, stream: MediaStream): void {
            this._mediStreamSourceNode = unitContext.audioContext.createMediaStreamSource(<any>stream);
            this._mediStreamSourceNode.connect(this._outputGainNode);
        }
    }
}
