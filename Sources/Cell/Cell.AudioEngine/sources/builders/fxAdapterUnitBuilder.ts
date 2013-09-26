/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAdapterUnitBuilder<TNode extends AudioNode> extends FxLinearInterfaceUnitBuilder {

        private _audioNode: TNode;

        private _audioNodeType: NodeType;

        private _audioNodeFactoryMethodArguments: any[];


        public get audioNode(): TNode {
            return this._audioNode;
        }


        constructor(audioNodeType: NodeType, ...args: any[]) {
            super();

            this._audioNodeType = audioNodeType;
            this._audioNodeFactoryMethodArguments = args;
        }


        public buildAudioGraph(unitContext: FxUnitContext): AudioNode[] {
            var audioNode: TNode = this._createNode(unitContext);
            var audioGraph: TNode[] = [audioNode];

            this._audioNode = audioNode;

            return audioGraph;
        }


        private _createNode(unitContext: FxUnitContext): TNode {
            var audioContext: AudioContext = unitContext.audioContext;
            var audioNodeType: NodeType = this._audioNodeType;
            var audioNodeArguments: any[] = this._audioNodeFactoryMethodArguments;


            var audioNode: TNode = <TNode>FxAudioUtilities.WebAudioAPI.createNode(
                audioContext, audioNodeType, audioNodeArguments);

            return audioNode;
        }
    }
}
