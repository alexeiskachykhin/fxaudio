/// <reference path="../_references.ts" />


module FxAudioEngine.Nodes {
    'use strict';


    export class FxAudioDestinationNode  extends FxAudioNode {

        private _audioDestinationNode: AudioDestinationNode;


        public get maxChannelCount(): number {
            return this._audioDestinationNode.maxNumberOfChannels;
        }


        constructor(audioContext: FxRealTimeAudioContext) {
            var audioGraph = this._buildAudioGraph(audioContext);

            super(audioContext, audioGraph);
        }


        private _buildAudioGraph(audioContext: FxAudioContext): AudioNode[] {
            var audioDestinationNode: AudioDestinationNode = audioContext.audioContext.destination;
            var audioGraph: AudioNode[] = [audioDestinationNode];

            return audioGraph;
        }
    }
}