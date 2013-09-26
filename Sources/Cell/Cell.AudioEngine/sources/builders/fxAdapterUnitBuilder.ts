/// <reference path="../_references.ts" />


module FxAudioEngine {
    'use strict';


    export class FxAdapterUnitBuilder<TNode extends AudioNode> implements IFxUnitBuilder {

        private _audioNode: TNode;

        private _audioNodeType: NodeType;

        private _audioNodeFactoryMethodArguments: any[];


        public get audioNode(): TNode {
            return this._audioNode;
        }


        constructor(audioNodeType: NodeType, ...args: any[]) {
            this._audioNodeType = audioNodeType;
            this._audioNodeFactoryMethodArguments = args;
        }


        public buildAudioCircuit(unitContext: FxUnitContext): FxAudioCircuit {
            var audioNode: TNode = this._createNode(unitContext);
            var audioCircuit: FxAudioCircuit = new FxAudioCircuit(audioNode, audioNode);

            this._audioNode = audioNode;

            return audioCircuit;
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
